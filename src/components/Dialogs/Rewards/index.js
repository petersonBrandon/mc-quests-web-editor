import TextInput from "@/components/general/TextInput";
import React, { useEffect, useState } from "react";
import AddItemDialog from "../AddItem";

const RewardDialog = (props) => {
  const [rewards, setRewards] = useState(rewardsTemplate);
  const [addOpen, setAddOpen] = useState(false);

  const getDeepCopyOfRewards = () => {
    return JSON.parse(JSON.stringify(rewards));
  };

  useEffect(() => {
    if (props.rewards !== undefined && props.rewards.length !== 0) {
      setRewards(props.rewards);
    } else {
      setRewards(rewardsTemplate);
    }
  }, [props.open]);

  return (
    <>
      <AddItemDialog
        open={addOpen}
        cancel={() => setAddOpen(false)}
        save={(item) => {
          if (item.name === "") setAddOpen(false);
          else {
            setAddOpen(false);
            let temp = getDeepCopyOfRewards();
            temp.items.push(item);
            setRewards(temp);
          }
        }}
      />
      <dialog open={props.open}>
        <div className="w-screen bg-opacity-50 bg-black h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-40">
          <div className="w-3/4 bg-white rounded-xl p-5 flex flex-col items-center space-y-5">
            <div className="flex-grow w-full">
              <h2 className="text-3xl text-center pb-5">Rewards</h2>
              <div className="flex w-full justify-center space-x-20">
                <div className="w-full flex flex-col space-y-5">
                  <TextInput
                    placeholder="Money $"
                    value={rewards.money !== 0 ? rewards.money : ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRewards();
                      temp.money = text;
                      setRewards(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Quests Points"
                    value={
                      rewards.quest_points !== 0 ? rewards.quest_points : ""
                    }
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRewards();
                      temp.quest_points = text;
                      setRewards(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Experience Levels"
                    value={rewards.exp !== 0 ? rewards.exp : ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRewards();
                      temp.exp = text;
                      setRewards(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Command"
                    value={rewards.commands !== "" ? rewards.commands : ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRewards();
                      temp.commands = text;
                      setRewards(temp);
                    }}
                  />
                  <div className="flex w-full space-x-5">
                    <TextInput
                      placeholder="Permission"
                      value={
                        rewards.permissions !== 0 ? rewards.permissions : ""
                      }
                      onTextChange={(text) => {
                        let temp = getDeepCopyOfRewards();
                        temp.permissions = text;
                        setRewards(temp);
                      }}
                    />
                    <TextInput
                      placeholder="Permission World"
                      value={
                        rewards.permission_worlds !== 0
                          ? rewards.permission_worlds
                          : ""
                      }
                      onTextChange={(text) => {
                        let temp = getDeepCopyOfRewards();
                        temp.permission_worlds = text;
                        setRewards(temp);
                      }}
                    />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-between w-full">
                    <h3 className="py-2">Item(s)</h3>
                    <button
                      onClick={() => setAddOpen(true)}
                      className="px-8 bg-bamboo_green text-white rounded-xl hover:scale-105 ease-in-out duration-300"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-5 h-52 overflow-scroll">
                    {rewards.items.map((item) => {
                      return (
                        <div
                          className="flex py-2 pr-5 w-full justify-between"
                          key={item.id}
                        >
                          <div className="flex space-x-3">
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
                          <button
                            className="text-bamboo_red"
                            onClick={() => {
                              let temp = getDeepCopyOfRewards();
                              for (let testItem of temp.items) {
                                if (item.id === testItem.id) {
                                  temp.items.splice(
                                    temp.items.indexOf(testItem),
                                    1
                                  );
                                  break;
                                }
                              }
                              setRewards(temp);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full space-x-16">
              <button
                onClick={props.cancel}
                className="w-full bg-bamboo_red text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  props.save(rewards);
                }}
                className="w-full bg-bamboo_green text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

const rewardsTemplate = {
  money: "",
  quest_points: "",
  exp: "",
  commands: "",
  permissions: "",
  permission_worlds: "",
  items: [],
};

export default RewardDialog;
