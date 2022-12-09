import React from "react";
import RecentTimes from "./RecentTimes";

export default function UserLeaderboard({ time_trials }) {
    
    const recentTimesCard = time_trials.slice(0,10).map((time_trial) => 
      <RecentTimes
        key={time_trial.id}
        id={time_trial.id}
        time_trial={time_trial}
      />
    );

    return (
        <div className="bg-slate-200 absolute bottom-[4%] left-[30%] ml-20 h-[75%] w-[60%] rounded-md border-4 outline overflow-auto">
            <div className="grid grid-cols-1 grid-rows-auto gap-y-2 mb-4 xl:pt-1 ">
            {recentTimesCard}            
            </div>
        </div>
    );
}