import TextInput from "@/components/general/TextInput";
import React, { useEffect, useState } from "react";
import AddItemDialog from "../AddItem";
import Button from "@/components/general/Button";
import { All_MC_Items } from "@/components/Other/All_MC_Items";
import Select from "react-dropdown-select";

const StagesDialog = (props) => {
  const [stageList, setStageList] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [itemList, setItemList] = useState([]);

  const [currentStage, setCurrentStage] = useState(stageTemplate);

  const [condition, setCondition] = useState();
  const [block, setBlock] = useState({ name: "", type: "", amount: 0, id: 0 });
  const [mobAction, setMobAction] = useState("");
  const [mobsOptions, setMobsOptions] = useState(mobDetails);
  const [editID, setEditID] = useState("");

  const getDeepCopyOfCurrStage = () => {
    return JSON.parse(JSON.stringify(currentStage));
  };

  const getDeepCopyOfBlock = () => {
    return JSON.parse(JSON.stringify(block));
  };

  const getDeepCopyOfMobs = () => {
    return JSON.parse(JSON.stringify(mobsOptions));
  };

  const getDeepCopyOfStageList = () => {
    return JSON.parse(JSON.stringify(stageList));
  };

  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));

  useEffect(() => {
    if (props.stageList !== undefined && props.stageList.length !== 0) {
      setStageList(props.stageList);
    } else {
      setStageList([]);
    }
    setCurrentStage(stageTemplate);
    const all_Items = All_MC_Items;
    let temp = [];
    let tempNum = 1;
    for (let item of all_Items) {
      temp.push({
        label: item.name,
        value: tempNum,
      });
      tempNum++;
    }
    setItemList(temp);
    setSeed(Math.floor(Math.random() * 1000000));
    setEditID("");
    document.getElementById("stage_form").reset();
  }, [props.open]);

  return (
    <>
      <AddItemDialog
        open={addOpen}
        showActionSelect={true}
        cancel={() => setAddOpen(false)}
        save={(item) => {
          if (item.name === "") setAddOpen(false);
          else {
            setAddOpen(false);
            let temp = getDeepCopyOfCurrStage();
            temp.items.push(item);
            setCurrentStage(temp);
          }
        }}
      />
      <dialog open={props.open} key={seed}>
        {/* <button
          className="p-3 px-5 m-5 fixed top-0 right-0 bg-bamboo_green rounded-xl z-50 text-white hover:scale-105 ease-in-out duration-300"
          onClick={() => {
            let temp = getDeepCopyOfStageList();
            if (editID !== "") {
              for (let i of temp) {
                if (i.id === editID) {
                  temp[temp.indexOf(i)].data = currentStage;
                }
              }
            } else {
              temp.push({
                id: Math.floor(Math.random() * 1000000),
                data: currentStage,
              });
            }
            setStageList(temp);
          }}
        >
          Save stage to list
        </button> */}
        <div className="w-screen bg-opacity-50 bg-black h-screen fixed top-0 left-0 flex flex-col justify-center items-center z-40">
          <div className="w-full h-full bg-white rounded-xl p-5 flex flex-col items-center space-y-5">
            <div className="flex flex-col flex-grow w-full">
              <h2 className="text-3xl text-center pb-5">Stages</h2>
              <form
                id="stage_form"
                className="flex w-full flex-grow justify-center space-x-20"
              >
                <div className="flex flex-col w-1/4 p-5 text-white bg-bamboo_gray rounded-xl h-full">
                  <h3 className="text-center text-xl mb-5">Stage List</h3>
                  <Button
                    text={editID !== "" ? "Save Changes" : "Add Stage"}
                    action={() => {
                      let temp = getDeepCopyOfStageList();
                      if (editID !== "") {
                        for (let i of temp) {
                          if (i.id === editID) {
                            temp[temp.indexOf(i)].data = currentStage;
                          }
                        }
                      } else {
                        temp.push({
                          id: Math.floor(Math.random() * 1000000),
                          data: currentStage,
                        });
                      }
                      setStageList(temp);
                      setCurrentStage(stageTemplate);
                      setEditID("");
                      document.getElementById("stage_form").reset();
                      setSeed(Math.floor(Math.random() * 1000000));
                    }}
                  />
                  <div className="flex-grow pt-5">
                    {stageList.map((stage) => {
                      return (
                        <div
                          key={stage.id}
                          className="text-xl flex w-full justify-between"
                        >
                          <button
                            className="w-full text-left"
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentStage(stage.data);
                              setEditID(stage.id);
                              setSeed(Math.floor(Math.random() * 1000000));
                            }}
                          >{`Stage #${stageList.indexOf(stage) + 1}`}</button>
                          <button
                            className="text-bamboo_red"
                            onClick={(e) => {
                              e.preventDefault();
                              let temp = getDeepCopyOfStageList();
                              for (let c of temp) {
                                if (c.id === stage.id) {
                                  temp.splice(temp.indexOf(c), 1);
                                  break;
                                }
                              }
                              setStageList(temp);
                            }}
                          >
                            remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col space-y-5 w-1/4 mt-20">
                  <TextInput
                    placeholder="Start Message"
                    value={
                      currentStage.start_message !== ""
                        ? currentStage.start_message
                        : ""
                    }
                    filled={currentStage.start_message !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrStage();
                      temp.start_message = text;
                      setCurrentStage(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Complete Message"
                    value={
                      currentStage.complete_message !== ""
                        ? currentStage.complete_message
                        : ""
                    }
                    filled={currentStage.complete_message !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrStage();
                      temp.complete_message = text;
                      setCurrentStage(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Delay Message"
                    value={
                      currentStage.delay_message !== ""
                        ? currentStage.delay_message
                        : ""
                    }
                    filled={currentStage.delay_message !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrStage();
                      temp.delay_message = text;
                      setCurrentStage(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Delay in seconds"
                    value={currentStage.delay !== "" ? currentStage.delay : ""}
                    filled={currentStage.delay !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrStage();
                      temp.delay = text;
                      setCurrentStage(temp);
                    }}
                  />
                  <TextInput
                    placeholder="Kill Players"
                    value={
                      currentStage.kill_players !== ""
                        ? currentStage.kill_players
                        : ""
                    }
                    filled={currentStage.kill_players !== ""}
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrStage();
                      temp.kill_players = text;
                      setCurrentStage(temp);
                    }}
                  />
                  <Button text="NPCS" />
                  <div className="flex-grow space-y-2">
                    <h3 className="text-lg">Conditions</h3>
                    <div className="flex space-x-2">
                      <TextInput
                        placeholder="Condition"
                        onTextChange={(text) => {
                          setCondition(text);
                        }}
                      />
                      <Button
                        text="Add"
                        action={() => {
                          let temp = getDeepCopyOfCurrStage();
                          temp.conditions.push({
                            condition: condition,
                            id: Math.floor(Math.random() * 1000000),
                          });
                          setCurrentStage(temp);
                        }}
                      />
                    </div>
                    <div className="space-y-3 overflow-scroll h-52">
                      {currentStage.conditions.map((item) => {
                        return (
                          <div
                            id={item.id}
                            className="flex justify-between pr-5"
                          >
                            <p>{item.condition}</p>
                            <button
                              className="text-bamboo_red"
                              onClick={() => {
                                let temp = getDeepCopyOfCurrStage();
                                for (let c of temp.conditions) {
                                  if (c.id === item.id) {
                                    temp.conditions.splice(
                                      temp.conditions.indexOf(c),
                                      1
                                    );
                                    break;
                                  }
                                }
                                setCurrentStage(temp);
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
                <div className="flex flex-col space-y-5 w-1/4 mt-20">
                  <div className="space-y-3">
                    <h3 className="text-lg">Blocks</h3>
                    <div className="flex space-x-2 w-full">
                      <div className="flex-grow w-full z-40">
                        <Select
                          options={blockOptions}
                          searchable={true}
                          clearable={true}
                          dropdownHandle={true}
                          dropdownHeight="250px"
                          placeholder="Select action"
                          onChange={(values) => {
                            let temp = getDeepCopyOfBlock();
                            if (values[0] !== undefined)
                              temp.type = values[0].label;
                            setBlock(temp);
                          }}
                        />
                      </div>
                      <div className="flex-grow w-full z-40">
                        <Select
                          options={itemList}
                          searchable={true}
                          clearable={true}
                          dropdownHandle={true}
                          dropdownHeight="250px"
                          placeholder="Select Block"
                          onChange={(values) => {
                            let temp = getDeepCopyOfBlock();
                            if (values[0] !== undefined)
                              temp.name = values[0].label;
                            setBlock(temp);
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <TextInput
                        placeholder="Amount"
                        onTextChange={(text) => {
                          let temp = getDeepCopyOfBlock();
                          temp.amount = text;
                          setBlock(temp);
                        }}
                      />
                      <Button
                        text="Add"
                        action={() => {
                          let temp = getDeepCopyOfCurrStage();
                          let tempBlock = getDeepCopyOfBlock();
                          tempBlock.id = Math.floor(Math.random() * 1000000);
                          temp.blocks.push(tempBlock);
                          setCurrentStage(temp);
                          console.log(temp);
                        }}
                      />
                    </div>
                    <div className="space-y-3 overflow-scroll h-52">
                      {currentStage.blocks.map((block) => {
                        return (
                          <div
                            key={block.id}
                            className="flex justify-between pr-5"
                          >
                            <div>
                              <p>{`${block.amount} x ${block.name} (${block.type})`}</p>
                            </div>
                            <button
                              className="text-bamboo_red"
                              onClick={() => {
                                let temp = getDeepCopyOfCurrStage();
                                for (let c of temp.blocks) {
                                  if (c.id === block.id) {
                                    temp.blocks.splice(
                                      temp.blocks.indexOf(c),
                                      1
                                    );
                                    break;
                                  }
                                }
                                setCurrentStage(temp);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-grow space-y-3">
                    <h3 className="text-lg">Mobs</h3>
                    <div className="relative z-50">
                      <Select
                        options={mobActionOptions}
                        searchable={true}
                        clearable={true}
                        dropdownHandle={true}
                        clearOnSelect={true}
                        dropdownHeight="250px"
                        placeholder="Select Action"
                        onChange={(values) => {
                          if (values[0] !== undefined)
                            setMobAction(values[0].label);
                          else setMobAction();
                        }}
                      />
                    </div>
                    {mobAction === "Kill" ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <TextInput
                            placeholder="Mob Type"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.kill.type = text;
                              setMobsOptions(temp);
                            }}
                          />
                          <TextInput
                            placeholder="Amount"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.kill.amount = text;
                              setMobsOptions(temp);
                            }}
                          />
                          <TextInput
                            placeholder="Kill Location"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.kill.location = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <div className="flex space-x-2 w-2/3">
                          <TextInput
                            placeholder="Location Radii"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.kill.location_radii = text;
                              setMobsOptions(temp);
                            }}
                          />
                          <TextInput
                            placeholder="Location Name"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.kill.location_name = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <Button
                          text="Add"
                          action={() => {
                            let temp = getDeepCopyOfCurrStage();
                            let mobs = getDeepCopyOfMobs();
                            let id = Math.floor(Math.random() * 1000000);
                            temp.mobs.push({
                              id: id,
                              type: "Kill",
                              data: mobs.kill,
                            });
                            setCurrentStage(temp);
                            setMobsOptions(mobDetails);
                            setMobAction("");
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {mobAction === "Tame" ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <TextInput
                            placeholder="Mob Type"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.tame.type = text;
                              setMobsOptions(temp);
                            }}
                          />
                          <TextInput
                            placeholder="Amount"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.tame.amount = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <Button
                          text="Add"
                          action={() => {
                            let temp = getDeepCopyOfCurrStage();
                            let mobs = getDeepCopyOfMobs();
                            let id = Math.floor(Math.random() * 1000000);
                            temp.mobs.push({
                              id: id,
                              type: "Tame",
                              data: mobs.tame,
                            });
                            setCurrentStage(temp);
                            setMobsOptions(mobDetails);
                            setMobAction("");
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {mobAction === "Catch Fish" ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <TextInput
                            placeholder="Amount"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.catch_fish = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <Button
                          text="Add"
                          action={() => {
                            let temp = getDeepCopyOfCurrStage();
                            let mobs = getDeepCopyOfMobs();
                            let id = Math.floor(Math.random() * 1000000);
                            temp.mobs.push({
                              id: id,
                              type: "Catch Fish",
                              data: mobs.catch_fish,
                            });
                            setCurrentStage(temp);
                            setMobsOptions(mobDetails);
                            setMobAction("");
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {mobAction === "Milk Cows" ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <TextInput
                            placeholder="Amount"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.milk_cows = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <Button
                          text="Add"
                          action={() => {
                            let temp = getDeepCopyOfCurrStage();
                            let mobs = getDeepCopyOfMobs();
                            let id = Math.floor(Math.random() * 1000000);
                            temp.mobs.push({
                              id: id,
                              type: "Milk Cows",
                              data: mobs.milk_cows,
                            });
                            setCurrentStage(temp);
                            setMobsOptions(mobDetails);
                            setMobAction("");
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {mobAction === "Shear Sheep" ? (
                      <div className="space-y-3">
                        <div className="flex space-x-2">
                          <TextInput
                            placeholder="Color"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.shear_sheep.type = text;
                              setMobsOptions(temp);
                            }}
                          />
                          <TextInput
                            placeholder="Amount"
                            onTextChange={(text) => {
                              let temp = getDeepCopyOfMobs();
                              temp.shear_sheep.amount = text;
                              setMobsOptions(temp);
                            }}
                          />
                        </div>
                        <Button
                          text="Add"
                          action={() => {
                            let temp = getDeepCopyOfCurrStage();
                            let mobs = getDeepCopyOfMobs();
                            let id = Math.floor(Math.random() * 1000000);
                            temp.mobs.push({
                              id: id,
                              type: "Sheer Sheep",
                              data: mobs.shear_sheep,
                            });
                            setCurrentStage(temp);
                            setMobsOptions(mobDetails);
                            setMobAction("");
                          }}
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    {mobAction === "" ? (
                      <div className="space-y-3 overflow-scroll h-52">
                        {currentStage.mobs.map((mob) => {
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
                                  <p>{`${mob.data.amount} x ${mob.data.type} (${mob.type})`}</p>
                                )}
                              </div>
                              <button
                                className="text-bamboo_red"
                                onClick={() => {
                                  let temp = getDeepCopyOfCurrStage();
                                  for (let c of temp.mobs) {
                                    if (c.id === mob.id) {
                                      temp.mobs.splice(temp.mobs.indexOf(c), 1);
                                      break;
                                    }
                                  }
                                  setCurrentStage(temp);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-5 w-1/4 mt-20">
                  <div>
                    <div className="flex justify-between w-full">
                      <h3 className="py-2 text-lg">Item(s)</h3>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setAddOpen(true);
                        }}
                        className="px-8 bg-bamboo_green text-white rounded-xl hover:scale-105 ease-in-out duration-300"
                      >
                        Add
                      </button>
                    </div>
                    <div className="mt-5 h-40 overflow-scroll">
                      {currentStage.items.map((item) => {
                        return (
                          <div
                            className="flex py-2 pr-5 w-full justify-between"
                            key={item.id}
                          >
                            <div className="flex space-x-3">
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
                            <button
                              className="text-bamboo_red"
                              onClick={() => {
                                let temp = getDeepCopyOfCurrStage();
                                for (let testItem of temp.items) {
                                  if (item.id === testItem.id) {
                                    temp.items.splice(
                                      temp.items.indexOf(testItem),
                                      1
                                    );
                                    break;
                                  }
                                }
                                setCurrentStage(temp);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg">Locations</h3>
                    <p>Not yet implemented</p>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg">Passwords</h3>
                    <p>Not yet implemented</p>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg">Actions</h3>
                    <p>Not yet implemented</p>
                  </div>
                </div>
              </form>
            </div>

            {/* CONFIRMATION BUTTONS */}
            <div className="flex w-full space-x-16">
              <button
                onClick={props.cancel}
                className="w-full bg-bamboo_red text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  props.save(stageList);
                }}
                className="w-full bg-bamboo_green text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
              >
                Save All
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

const stageTemplate = {
  blocks: [],
  items: [],
  npcs: [],
  mobs: [],
  kill_players: "",
  locations: [],
  passwords: [],
  actions: [],
  conditions: [],
  delay: "",
  delay_message: "",
  start_message: "",
  complete_message: "",
};

const blockOptions = [
  {
    value: 1,
    label: "Break",
  },
  {
    value: 2,
    label: "Damage",
  },
  {
    value: 3,
    label: "Place",
  },
  {
    value: 4,
    label: "Use",
  },
];

const mobActionOptions = [
  {
    value: 1,
    label: "Kill",
  },
  {
    value: 2,
    label: "Tame",
  },
  {
    value: 3,
    label: "Catch Fish",
  },
  {
    value: 4,
    label: "Milk Cows",
  },
  {
    value: 5,
    label: "Shear Sheep",
  },
];

const mobDetails = {
  id: 0,
  kill: {
    type: "",
    amount: 0,
    location: "",
    location_radii: "",
    location_name: "",
  },
  tame: {
    type: "",
    amount: 0,
  },
  catch_fish: 0,
  milk_cows: 0,
  shear_sheep: {
    type: "",
    amount: 0,
  },
};

export default StagesDialog;
