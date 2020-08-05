import React, { useContext, useEffect } from 'react'
import { RootStoreContext } from '../../../../../app/stores/rootStore';
import { observer } from 'mobx-react-lite';

const TrainerPractice: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadPractice, etude, userPractice} = rootStore.userPracticeStore;

    useEffect(() => {
      loadPractice();
    }, [loadPractice]);


    return (
        <div>
            <h1>Trainer PRactice</h1>
        </div>
    )
}

export default observer(TrainerPractice);
