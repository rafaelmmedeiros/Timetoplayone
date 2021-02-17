using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.AppTrainer.Practices.Others;
using Application.AppTrainer.Util;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Practices
{
    public class Acquire
    {
        public class PracticeEnvelope
        {
            public List<EtudePracticeDto> Etudes { get; set; }
        }

        public class Query : IRequest<PracticeEnvelope>
        {
            public Query()
            {
            }
        }

        public class Handler : IRequestHandler<Query, PracticeEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            private readonly ITomePosition _tomePosiiton;
            private readonly ITomeActive _tomeActive;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor, ITomePosition tomePosiiton, ITomeActive tomeActive)
            {
                _tomeActive = tomeActive;
                _tomePosiiton = tomePosiiton;
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<PracticeEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                // TODO, Place the 2 inactive here... find a way, one is easy... the other...
                var queryable = _context.Etudes
                    .Where(a => a.AppUserId == user.Id)
                    .AsQueryable();

                var etudes = queryable.ToList();
                var etudesToProcessing = new List<EtudePracticeDto>();

                foreach (var etude in etudes)
                {
                    var userEtude = new EtudePracticeDto
                    {
                        Id = etude.Id,
                        Title = etude.Title,
                        Active = etude.Active,
                        Fluence = etude.Fluence,
                        Tome = etude.Tome,
                        TomePosition = await _tomePosiiton.GetTomePosition(etude.Tome),
                        TomeActive = await _tomeActive.GetTomeStatus(etude.Tome),
                        Time = etude.Time,
                        Description = etude.Description,
                        LastPlayed = etude.LastPlayed,
                        Priority = CalculatePriority(etude.Fluence, etude.LastPlayed)
                    };
                    if (userEtude.Active == true && userEtude.TomeActive == true)
                    {
                        etudesToProcessing.Add(userEtude);
                    }
                }

                List<EtudePracticeDto> sortedetudesToReturn = etudesToProcessing
                    .OrderBy(x => x.TomePosition)
                    .ThenBy(x => x.Priority)
                    .ThenBy(x => x.Fluence)
                    .ToList();

                return new PracticeEnvelope
                {
                    Etudes = sortedetudesToReturn
                };
            }

            public double CalculatePriority(int fluence, DateTime lastPlayed)
            {
                double daysWithoutPlaying = (DateTime.Now - lastPlayed).TotalDays;

                double priority = 0;

                switch (fluence)
                {
                    case 1:
                        priority = 100 - ((daysWithoutPlaying / 1.5) * 10);
                        break;
                    case 2:
                        priority = 100 - ((daysWithoutPlaying / 1.5) * 10);
                        break;
                    case 3:
                        priority = 100 - ((daysWithoutPlaying / 1.5) * 10);
                        break;
                    default:
                        priority = 100;
                        break;
                }

                double priorityToReturn = Math.Clamp(priority, 0, 100);

                return Math.Round(priorityToReturn);
            }
        }
    }
}