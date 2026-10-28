import React from "react";

const TeamMember = () => {
    return (
        <div className="container-root h-[50vh]">
            <h1 className="font-bold text-3xl">Team member</h1>
            <h1 className="font-bold text-2xl">Group No - 2</h1>
            <div className="flex flex-wrap w-full gap-3">
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Afroza Rahaman</h2>
                        <p className="text-xl"><b>ID:</b> 232003122E</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Pranta Barua</h2>
                        <p className="text-xl"><b>ID:</b> 232003422E</p>
                    </div>
                </div>

                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Rudra Das</h2>
                        <p className="text-xl"><b>ID:</b> 232001322E</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
