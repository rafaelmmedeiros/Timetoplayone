using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using Domain.AppTrainer;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.AppTrainer.Collections
{
    public class Detail
    {
        public class Query : IRequest<EtudeEditDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, EtudeEditDto>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<EtudeEditDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                var etude = await _context.Etudes.FindAsync(request.Id);

                if (etude.AppUserId != user.Id)
                    throw new Errors.RESTException(HttpStatusCode.Forbidden, new { etude = "Not belongs to you... " });

                if (etude == null)
                    throw new Errors.RESTException(HttpStatusCode.NotFound, new { etude = "Not Found" });

                var etudeToReturn = _mapper.Map<Etude, EtudeEditDto>(etude);

                return etudeToReturn;

            }
        }

    }
}