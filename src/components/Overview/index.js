import React from "react";

const Overview = ({ quest }) => {
  return (
    <div className="w-1/5">
      <h3 className="text-xl p-5 text-center">Quest Overview</h3>
      <div className="overflow-scroll h-5/6">
        {/* QUEST BASIC INFO */}
        <p>{`Name: ${quest.name !== "" ? quest.name : ""}`}</p>
        <p>{`Ask Message: ${quest.ask_message}`}</p>
        <p>{`Finish Message: ${quest.finish_message}`}</p>
        {quest.npc_giver_uuid !== "" ? (
          <p>{`NPC UUID: ${quest.npc_giver_uuid}`}</p>
        ) : (
          <></>
        )}
        {quest.block_start !== "" ? (
          <p>{`Block Start: ${quest.block_start}`}</p>
        ) : (
          <> </>
        )}
        {quest.region !== "" ? <p>{`Region Start: ${quest.region}`}</p> : <></>}

        {/* QUEST REQUIREMENTS */}
        {quest.requirements.length !== 0 ? (
          <div className="py-2">
            <p className="font-bold">REQUIREMENTS:</p>
            <div className="pl-5">
              {quest.requirements.money != "" ? (
                <p>{`- $${quest.requirements.money}`}</p>
              ) : (
                <></>
              )}
              {quest.requirements.quest_points != "" ? (
                <p>{`- ${quest.requirements.quest_points} quest points`}</p>
              ) : (
                <></>
              )}
              {quest.requirements.exp != "" ? (
                <p>{`- ${quest.requirements.exp} level(s)`}</p>
              ) : (
                <></>
              )}
              {quest.requirements.permissions.length !== 0 ? (
                <div>
                  <p className="font-bold">Perms:</p>
                  <div className="pl-5">
                    {quest.requirements.permissions.map((perm) => {
                      return (
                        <div>
                          <p>{`- ${perm.data}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {quest.requirements.quests.length !== 0 ? (
                <div>
                  <p className="font-bold">Quests:</p>
                  <div className="pl-5">
                    {quest.requirements.quests.map((quest) => {
                      return (
                        <div>
                          <p>{`- ${quest.data}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
              {quest.requirements.items.length != 0 ? (
                <div>
                  <p className="font-bold">Items:</p>
                  <div className="pl-5">
                    {quest.requirements.items.map((item) => {
                      return (
                        <div className="flex space-x-3">
                          {item.display_name === "" ? (
                            <p>{`- ${item.name}`}</p>
                          ) : (
                            <>
                              <p>{`- ${item.display_name}`}</p>
                              <p>{`(${item.name})`}</p>
                            </>
                          )}
                          <p>{`x ${item.amount}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* QUEST STAGES */}
        {quest.stages.length !== 0 ? (
          <div className="py-2">
            <p className="font-bold">STAGES:</p>
            <div className="pl-5">
              {quest.stages.map((stageInfo) => {
                const stage = stageInfo.data;
                return (
                  <div>
                    <p className="font-bold">{`Stage ${
                      quest.stages.indexOf(stageInfo) + 1
                    }:`}</p>
                    <div className="pl-5">
                      <p>{`Start Msg: ${stage.start_message}`}</p>
                      <p>{`Complete Msg: ${stage.complete_message}`}</p>
                      {stage.delay_message !== "" ? (
                        <p>{`Delay Msg: ${stage.delay_message}`}</p>
                      ) : (
                        <></>
                      )}
                      {stage.delay !== "" ? (
                        <p>{`Delay: ${stage.delay}sec(s)`}</p>
                      ) : (
                        <></>
                      )}
                      <p className="font-bold">OBJECTIVES:</p>
                      <div className="pl-5">
                        {/* KILL PLAYER OBJECTIVE */}
                        {stage.kill_players !== "" ? (
                          <p>{`Kill ${stage.kill_players} x players`}</p>
                        ) : (
                          <></>
                        )}
                        {/* BLOCK OBJECTIVES */}
                        {stage.blocks.map((block) => {
                          return (
                            <div
                              key={block.id}
                              className="flex justify-between pr-5"
                            >
                              <div>
                                <p>{`${block.type} ${block.amount} x ${block.name}`}</p>
                              </div>
                            </div>
                          );
                        })}
                        {/* MOB OBJECTIVES */}
                        {stage.mobs.map((mob) => {
                          return (
                            <div
                              key={mob.id}
                              className="flex justify-between pr-5"
                            >
                              <div>
                                {mob.type === "Catch Fish" ||
                                mob.type === "Milk Cows" ? (
                                  <p>{`${mob.type} x ${mob.data}`}</p>
                                ) : (
                                  <p>{`${mob.type} ${mob.data.amount} x ${mob.data.type}`}</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                        {/* ITEM OBJECTIVES */}
                        {stage.items.map((item) => {
                          return (
                            <div
                              className="flex w-full justify-between"
                              key={item.id}
                            >
                              <div className="flex space-x-1">
                                <p>{item.action}</p>
                                {item.display_name === "" ? (
                                  <p>{item.name}</p>
                                ) : (
                                  <>
                                    <p>{item.display_name}</p>
                                    <p>{`(${item.name})`}</p>
                                  </>
                                )}
                                <p>{`x ${item.amount}`}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {stage.conditions.length !== 0 ? (
                        <>
                          <p className="font-bold">CONDITIONS:</p>
                          <div className="pl-5">
                            {stage.conditions.map((item) => {
                              return (
                                <div id={item.id} className="">
                                  <p>{item.condition}</p>
                                </div>
                              );
                            })}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* QUEST REWARDS */}
        {quest.rewards.length !== 0 ? (
          <div className="py-2">
            <p className="font-bold">REWARDS:</p>
            <div className="pl-5">
              {quest.rewards.money != "" ? (
                <p>{`- $${quest.rewards.money}`}</p>
              ) : (
                <></>
              )}
              {quest.rewards.quest_points != "" ? (
                <p>{`- ${quest.rewards.quest_points} quest points`}</p>
              ) : (
                <></>
              )}
              {quest.rewards.exp != "" ? (
                <p>{`- ${quest.rewards.exp} level(s)`}</p>
              ) : (
                <></>
              )}
              {quest.rewards.commands != "" ? (
                <p>{`- ${quest.rewards.commands}`}</p>
              ) : (
                <></>
              )}
              {quest.rewards.permissions != "" ? (
                <div className="flex space-x-2">
                  <p>{`- ${quest.rewards.permissions}`}</p>
                  {quest.rewards.permission_worlds != "" ? (
                    <p>{`(${quest.rewards.permission_worlds})`}</p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {quest.rewards.items.length != 0 ? (
                <div>
                  <p className="font-bold">Items:</p>
                  <div className="pl-5">
                    {quest.rewards.items.map((item) => {
                      return (
                        <div className="flex space-x-3">
                          {item.display_name === "" ? (
                            <p>{`- ${item.name}`}</p>
                          ) : (
                            <>
                              <p>{`- ${item.display_name}`}</p>
                              <p>{`(${item.name})`}</p>
                            </>
                          )}
                          <p>{`x ${item.amount}`}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* QUEST OPTIONS */}
        {quest.options.allow_commands ||
        quest.options.allow_quitting ||
        quest.options.ignore_silk_touch ||
        quest.options.ignore_block_replace ? (
          <div>
            <p className="font-bold">OPTIONS:</p>
            <div className="pl-5">
              {quest.options.allow_commands ? <p>- Allow Commands</p> : <></>}
              {quest.options.allow_quitting ? <p>- Allow Quitting</p> : <></>}
              {quest.options.ignore_silk_touch ? (
                <p>- Ignore Silk Touch</p>
              ) : (
                <></>
              )}
              {quest.options.ignore_block_replace ? (
                <p>- Ignore Block Replace</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Overview;
