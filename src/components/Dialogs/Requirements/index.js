import TextInput from "@/components/general/TextInput";
import React, { useEffect, useState } from "react";
import AddItemDialog from "../AddItem";
import Button from "@/components/general/Button";

const RequirementsDialog = (props) => {
  const [requirements, setRequirements] = useState(requirementsTemplate);
  const [addOpen, setAddOpen] = useState(false);
  const [tempQuest, setTempQuest] = useState("");
  const [tempPermission, setTempPermission] = useState("");
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));

  const getDeepCopyOfRequirements = () => {
    return JSON.parse(JSON.stringify(requirements));
  };

  useEffect(() => {
    if (props.requirements !== undefined && props.requirements.length !== 0) {
      setRequirements(props.requirements);
    } else {
      setRequirements(requirementsTemplate);
    }
    setSeed(Math.floor(Math.random() * 1000000));
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
            let temp = getDeepCopyOfRequirements();
            temp.items.push(item);
            setRequirements(temp);
          }
        }}
      />
      <dialog key={seed} open={props.open}>
        <div className="w-screen bg-opacity-50 bg-black h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-40">
          <div className="w-3/4 bg-white rounded-xl p-5 flex flex-col items-center space-y-5">
            <div className="flex-grow w-full">
              <h2 className="text-3xl text-center pb-5">Requirements</h2>
              <div className="flex w-full justify-center space-x-20">
                <div className="w-full flex flex-col space-y-5">
                  <TextInput
                    placeholder="Money $"
                    value={requirements.money !== "" ? requirements.money : ""}
                    filled={requirements.money !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRequirements();
                      temp.money = text;
                      setRequirements(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Quests Points"
                    value={
                      requirements.quest_points !== ""
                        ? requirements.quest_points
                        : ""
                    }
                    filled={requirements.quest_points !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRequirements();
                      temp.quest_points = text;
                      setRequirements(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Experience Levels"
                    value={requirements.exp !== "" ? requirements.exp : ""}
                    filled={requirements.exp !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfRequirements();
                      temp.exp = text;
                      setRequirements(temp);
                    }}
                  />
                  <div className="flex w-full space-x-5">
                    <div className="w-full">
                      <div className="flex w-full space-x-3">
                        <TextInput
                          placeholder="Quest"
                          onTextChange={(text) => {
                            setTempQuest(text);
                          }}
                        />
                        <div>
                          <Button
                            text="Add"
                            action={() => {
                              let temp = getDeepCopyOfRequirements();
                              temp.quests.push({
                                id: Math.floor(Math.random() * 1000000),
                                data: tempQuest,
                              });
                              setRequirements(temp);
                              setSeed(Math.floor(Math.random() * 1000000));
                              setTempQuest("");
                            }}
                          />
                        </div>
                      </div>
                      <div className="pt-5 h-32 overflow-scroll space-y-2">
                        {requirements.quests.map((requirement) => {
                          return (
                            <div
                              key={requirement.id}
                              className="flex w-full justify-between pr-5"
                            >
                              <p className="w-full text-left">
                                {requirement.data}
                              </p>
                              <button
                                className="text-bamboo_red"
                                onClick={(e) => {
                                  e.preventDefault();
                                  let temp = getDeepCopyOfRequirements();
                                  for (let c of temp.quests) {
                                    if (c.id === requirement.id) {
                                      temp.quests.splice(
                                        temp.quests.indexOf(c),
                                        1
                                      );
                                      break;
                                    }
                                  }
                                  setRequirements(temp);
                                }}
                              >
                                remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex w-full space-x-3">
                        <TextInput
                          placeholder="Permission"
                          onTextChange={(text) => {
                            setTempPermission(text);
                          }}
                        />
                        <div>
                          <Button
                            text="Add"
                            action={() => {
                              let temp = getDeepCopyOfRequirements();
                              temp.permissions.push({
                                id: Math.floor(Math.random() * 1000000),
                                data: tempPermission,
                              });
                              setRequirements(temp);
                              setSeed(Math.floor(Math.random() * 1000000));
                              setTempPermission("");
                            }}
                          />
                        </div>
                      </div>
                      <div className="pt-5 h-32 overflow-scroll space-y-2">
                        {requirements.permissions.map((perm) => {
                          return (
                            <div
                              key={perm.id}
                              className="flex w-full justify-between pr-5"
                            >
                              <p className="w-full text-left">{perm.data}</p>
                              <button
                                className="text-bamboo_red"
                                onClick={(e) => {
                                  e.preventDefault();
                                  let temp = getDeepCopyOfRequirements();
                                  for (let c of temp.permissions) {
                                    if (c.id === perm.id) {
                                      temp.permissions.splice(
                                        temp.permissions.indexOf(c),
                                        1
                                      );
                                      break;
                                    }
                                  }
                                  setRequirements(temp);
                                }}
                              >
                                remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
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
                    {requirements.items.map((item) => {
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
                              setRequirements(temp);
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
                  props.save(requirements);
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

const requirementsTemplate = {
  money: "",
  quest_points: "",
  exp: "",
  quests: [],
  permissions: [],
  items: [],
};

export default RequirementsDialog;
