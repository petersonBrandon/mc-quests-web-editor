"use client";

import React, { useState } from "react";
import TextInput from "../general/TextInput";
import Button from "../general/Button";
import Checkbox from "../general/Checkbox";
import Overview from "../Overview";
import RewardDialog from "../Dialogs/Rewards";
import StagesDialog from "../Dialogs/Stages";
import RequirementsDialog from "../Dialogs/Requirements";

const MainWindow = () => {
  const [quest, setQuest] = useState(questTemplate);
  const [openModal, setOpenModal] = useState("");
  const [questList, setQuestList] = useState([]);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));
  const [seed2, setSeed2] = useState(Math.floor(Math.random() * 1000000));
  const [editID, setEditID] = useState("");

  const getDeepCopyOfQuest = () => {
    return JSON.parse(JSON.stringify(quest));
  };

  const getDeepCopyOfQuestList = () => {
    return JSON.parse(JSON.stringify(questList));
  };

  return (
    <>
      <RewardDialog
        open={openModal === "REWARDS"}
        cancel={() => setOpenModal("")}
        rewards={quest.rewards}
        save={(rewards) => {
          let temp = getDeepCopyOfQuest();
          temp.rewards = rewards;
          setQuest(temp);
          setOpenModal("");
        }}
      />
      <RequirementsDialog
        open={openModal === "REQUIREMENTS"}
        cancel={() => setOpenModal("")}
        requirements={quest.requirements}
        save={(requirements) => {
          let temp = getDeepCopyOfQuest();
          temp.requirements = requirements;
          setQuest(temp);
          setOpenModal("");
        }}
      />
      <StagesDialog
        open={openModal === "STAGES"}
        cancel={() => setOpenModal("")}
        stageList={quest.stages}
        save={(stages) => {
          let temp = getDeepCopyOfQuest();
          temp.stages = stages;
          setQuest(temp);
          setOpenModal("");
        }}
      />
      {/* SIDE TRAY */}
      <div
        key={seed2}
        className="bg-bamboo_gray px-5 py-5 rounded-tr-3xl w-1/5 h-full flex flex-col"
      >
        <h3 className="text-white text-xl text-center mb-5">Current Quests</h3>

        <div className="flex-grow text-white">
          {questList.length !== 0 ? (
            <>
              <div className="space-y-3">
                {questList.map((quest) => {
                  return (
                    <div key={quest.id} className="flex w-full justify-between">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuest(quest.data);
                          setSeed(Math.floor(Math.random() * 1000000));
                          setEditID(quest.id);
                        }}
                        className="w-full text-left"
                      >
                        {quest.data.name}
                      </button>
                      <button
                        className="text-bamboo_red"
                        onClick={(e) => {
                          e.preventDefault();
                          let temp = getDeepCopyOfQuestList();
                          for (let c of temp) {
                            if (c.id === quest.id) {
                              temp.splice(temp.indexOf(c), 1);
                              break;
                            }
                          }
                          setQuestList(temp);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <button className="bg-bamboo_green text-white p-2 rounded-full w-full my-5 hover:scale-105 ease-in-out duration-300">
          UPLOAD YML
        </button>
      </div>
      {/* MAIN AREA */}
      <div key={seed} className="w-3/5 flex flex-col items-center">
        <h2 className="text-2xl mb-5">
          {quest.name !== "" ? quest.name : "NEW QUEST"}
        </h2>
        <div className="w-full px-5 flex flex-col items-center space-y-10">
          <form id="quest_form" className="w-9/12 space-y-10">
            {/* REQUIRED Items */}
            <div className="w-full">
              <h4 className="mb-5">Required</h4>
              <div className="flex w-full space-x-40">
                <div className="flex flex-col w-full space-y-5">
                  <TextInput
                    placeholder="Quest Name"
                    value={quest.name !== "" ? quest.name : ""}
                    filled={quest.name !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfQuest();
                      temp.name = text;
                      setQuest(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Ask Message"
                    value={quest.ask_message !== "" ? quest.ask_message : ""}
                    filled={quest.ask_message !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfQuest();
                      temp.ask_message = text;
                      setQuest(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Finish Message"
                    value={
                      quest.finish_message !== "" ? quest.finish_message : ""
                    }
                    filled={quest.finish_message !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfQuest();
                      temp.finish_message = text;
                      setQuest(temp);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full space-y-5">
                  <Button
                    text="Edit Stages"
                    action={() => setOpenModal("STAGES")}
                  />
                  <Button
                    text="Edit Rewards"
                    action={() => setOpenModal("REWARDS")}
                  />
                </div>
              </div>
            </div>

            {/* OPTIONAL Items */}
            <div className="w-full">
              <h4 className="mb-5">Optional</h4>
              <div className="flex w-full space-x-40">
                <div className="flex flex-col w-full space-y-5">
                  <Button
                    text="Set Requirements"
                    action={() => setOpenModal("REQUIREMENTS")}
                  />
                  <TextInput
                    placeholder="World Guard Region Start"
                    value={quest.region !== "" ? quest.region : ""}
                    filled={quest.region !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfQuest();
                      temp.region = text;
                      setQuest(temp);
                    }}
                  />
                  <div className="w-full flex flex-col justify-center items-center">
                    <div className="flex flex-col space-y-2">
                      <Checkbox
                        title="Allow Commands"
                        defaultValue={quest.options.allow_commands}
                        onClick={(value) => {
                          let temp = getDeepCopyOfQuest();
                          temp.options.allow_commands = value;
                          setQuest(temp);
                        }}
                      />
                      <Checkbox
                        title="Allow Quitting"
                        defaultValue={quest.options.allow_quitting}
                        onClick={(value) => {
                          let temp = getDeepCopyOfQuest();
                          temp.options.allow_quitting = value;
                          setQuest(temp);
                        }}
                      />
                      <Checkbox
                        title="Ignore Silk Touch"
                        defaultValue={quest.options.ignore_silk_touch}
                        onClick={(value) => {
                          let temp = getDeepCopyOfQuest();
                          temp.options.ignore_silk_touch = value;
                          setQuest(temp);
                        }}
                      />
                      <Checkbox
                        title="Ignore Replaced Blocks"
                        defaultValue={quest.options.ignore_block_replace}
                        onClick={(value) => {
                          let temp = getDeepCopyOfQuest();
                          temp.options.ignore_block_replace = value;
                          setQuest(temp);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full space-y-5">
                  <Button text="Set NPC Giver" />
                  <Button text="Set Block Start" />
                  <Button text="Set Schedule" />
                </div>
              </div>
            </div>

            {/* SAVE OR RESET*/}
            <div className="flex w-full space-x-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setQuest(questTemplate);
                  document.getElementById("quest_form").reset();
                  setSeed(Math.floor(Math.random() * 1000000));
                }}
                className="bg-bamboo_red text-white w-full p-2 rounded-full text-xl hover:scale-105 ease-in-out duration-300"
              >
                RESET
              </button>
              <button
                className="bg-bamboo_green text-white w-full p-2 rounded-full text-xl hover:scale-105 ease-in-out duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  let temp = getDeepCopyOfQuestList();
                  if (editID !== "") {
                    for (let questItem of temp) {
                      if (questItem.id === editID) {
                        temp[temp.indexOf(questItem)].data = quest;
                      }
                    }
                  } else {
                    temp.push({
                      id: Math.floor(Math.random() * 1000000),
                      data: quest,
                    });
                  }
                  setQuestList(temp);
                  setQuest(questTemplate);
                  document.getElementById("quest_form").reset();
                  setSeed(Math.floor(Math.random() * 1000000));
                  setSeed2(Math.floor(Math.random() * 1000000));
                }}
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
      </div>
      <Overview quest={quest} />
    </>
  );
};

const questTemplate = {
  name: "",
  ask_message: "",
  finish_message: "",
  npc_giver_uuid: "",
  block_start: "",
  region: "",
  requirements: [],
  stages: [],
  rewards: [],
  planner: [],
  options: {
    allow_commands: true,
    allow_quitting: true,
    ignore_silk_touch: false,
    ignore_block_replace: false,
  },
};

export default MainWindow;
