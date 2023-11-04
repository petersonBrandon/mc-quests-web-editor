import TextInput from "@/components/general/TextInput";
import Select from "react-dropdown-select";
import React, { useEffect, useState } from "react";
import Button from "@/components/general/Button";
import { All_MC_Items } from "@/components/Other/All_MC_Items";

const AddItemDialog = (props) => {
  const [currentEnchantment, setCurrentEnchantment] = useState({});
  const [enchantmentList, setEnchantmentList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [showActionSelect, setActionSelect] = useState(false);

  const [item, setItem] = useState(itemTemplate);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 1000000));

  const getDeepCopyOfCurrEnchantment = () => {
    return JSON.parse(JSON.stringify(currentEnchantment));
  };

  const getDeepCopyOfEnchantmentList = () => {
    return JSON.parse(JSON.stringify(enchantmentList));
  };

  const getDeepCopyOfItem = () => {
    return JSON.parse(JSON.stringify(item));
  };

  useEffect(() => {
    document.getElementById("add_item_form").reset();
    setCurrentEnchantment({
      name: "",
      level: "",
      id: 0,
    });
    setItem(itemTemplate);
    setEnchantmentList([]);
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
    if (props.showActionSelect !== undefined) {
      setActionSelect(props.showActionSelect);
    } else {
      setActionSelect(false);
    }
  }, [props.open]);

  return (
    <div
      className={`w-screen bg-opacity-50 bg-black h-screen fixed top-0 left-0 flex flex-col 
                  justify-center items-center z-50 ${
                    props.open ? "block" : "hidden"
                  }`}
    >
      <div
        key={seed}
        className="w-3/4 bg-white rounded-xl p-5 flex flex-col items-center space-y-5"
      >
        <form id="add_item_form" className="flex-grow w-full">
          <h2 className="text-3xl text-center pb-5">ADD ITEM</h2>
          <div className="flex w-full justify-center space-x-20">
            <div className="w-full flex flex-col space-y-5">
              {showActionSelect ? (
                <div className="z-50">
                  <Select
                    options={actionOptions}
                    searchable={true}
                    clearable={true}
                    dropdownHandle={true}
                    dropdownHeight="250px"
                    placeholder="Select Action"
                    onChange={(values) => {
                      let temp = getDeepCopyOfItem();
                      if (values[0] !== undefined)
                        temp.action = values[0].label;
                      setItem(temp);
                    }}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="z-40">
                <Select
                  options={itemList}
                  searchable={true}
                  clearable={true}
                  dropdownHandle={true}
                  create={true}
                  dropdownHeight="250px"
                  placeholder="Select/Enter Item"
                  onChange={(values) => {
                    let temp = getDeepCopyOfItem();
                    if (values[0] !== undefined) temp.name = values[0].label;
                    setItem(temp);
                  }}
                />
              </div>
              <TextInput
                placeholder="Amount"
                onTextChange={(text) => {
                  let temp = getDeepCopyOfItem();
                  temp.amount = text;
                  setItem(temp);
                }}
              />
              <TextInput
                placeholder="Durability"
                onTextChange={(text) => {
                  let temp = getDeepCopyOfItem();
                  temp.durability = text;
                  setItem(temp);
                }}
              />
              <TextInput
                placeholder="Display Name"
                onTextChange={(text) => {
                  let temp = getDeepCopyOfItem();
                  temp.display_name = text;
                  setItem(temp);
                }}
              />
              <TextInput
                placeholder="Lore"
                onTextChange={(text) => {
                  let temp = getDeepCopyOfItem();
                  temp.lore = text;
                  setItem(temp);
                }}
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between w-full">
                <h3 className="py-2">Enchantment(s)</h3>
              </div>
              <div className="flex justify-center items-center space-x-5">
                <div className="w-2/4">
                  <Select
                    options={enchantOptions}
                    searchable={true}
                    clearable={true}
                    dropdownHandle={true}
                    dropdownHeight="250px"
                    placeholder="Select Enchantments"
                    onChange={(values) => {
                      let temp = getDeepCopyOfCurrEnchantment();
                      if (values[0] !== undefined) temp.name = values[0].label;
                      setCurrentEnchantment(temp);
                    }}
                  />
                </div>
                <div className="w-1/4">
                  <TextInput
                    placeholder="Level"
                    onTextChange={(text) => {
                      let temp = getDeepCopyOfCurrEnchantment();
                      temp.level = text;
                      setCurrentEnchantment(temp);
                    }}
                  />
                </div>
                <div className="w-1/4">
                  <Button
                    text="Add"
                    action={() => {
                      let temp = getDeepCopyOfEnchantmentList();
                      let tempEnch = getDeepCopyOfCurrEnchantment();
                      tempEnch.id++;
                      setCurrentEnchantment(tempEnch);
                      temp.push(tempEnch);
                      setEnchantmentList(temp);
                    }}
                  />
                </div>
              </div>
              <div className="mt-5 h-52 overflow-scroll">
                {enchantmentList.map((enchantment) => {
                  return (
                    <div
                      className="flex py-2 pr-5 w-full justify-between"
                      key={enchantment.id}
                    >
                      <div className="flex space-x-5">
                        <p>{enchantment.name}</p>
                        <p>{enchantment.level}</p>
                      </div>
                      <button
                        className="text-bamboo_red"
                        onClick={() => {
                          let temp = getDeepCopyOfEnchantmentList();
                          for (let ench of temp) {
                            if (ench.id === enchantment.id) {
                              temp.splice(temp.indexOf(ench), 1);
                              break;
                            }
                          }
                          setEnchantmentList(temp);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </form>
        <div className="flex w-full space-x-16">
          <button
            onClick={props.cancel}
            className="w-full bg-bamboo_red text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              let temp = getDeepCopyOfItem();
              temp.enchantments = enchantmentList;
              temp.id = Math.floor(Math.random() * 1000000);
              setItem(temp);
              props.save(temp);
            }}
            className="w-full bg-bamboo_green text-white p-2 rounded-full hover:scale-105 ease-in-out duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const itemTemplate = {
  name: "",
  id: 0,
  display_name: "",
  lore: "",
  amount: "",
  durability: "",
  enchantments: [],
};

const actionOptions = [
  {
    value: 1,
    label: "Craft",
  },
  {
    value: 2,
    label: "Smelt",
  },
  {
    value: 3,
    label: "Enchant",
  },
  {
    value: 4,
    label: "Brew Potions",
  },
  {
    value: 5,
    label: "Consume Items",
  },
];

const enchantOptions = [
  {
    value: 1,
    label: "Aqua Affinity",
  },
  {
    value: 2,
    label: "Bane of Arthropods",
  },
  {
    value: 3,
    label: "Blast Protection",
  },
  {
    value: 4,
    label: "Channeling",
  },
  {
    value: 5,
    label: "Curse of Binding",
  },
  {
    value: 6,
    label: "Curse of Vanishing",
  },
  {
    value: 7,
    label: "Depth Strider",
  },
  {
    value: 8,
    label: "Efficiency",
  },
  {
    value: 9,
    label: "Feather Falling",
  },
  {
    value: 10,
    label: "Fire Aspect",
  },
  {
    value: 11,
    label: "Fire Protection",
  },
  {
    value: 12,
    label: "Flame",
  },
  {
    value: 13,
    label: "Fortune",
  },
  {
    value: 14,
    label: "Frost Walker",
  },
  {
    value: 15,
    label: "Impaling",
  },
  {
    value: 16,
    label: "Infinity",
  },
  {
    value: 17,
    label: "Knockback",
  },
  {
    value: 18,
    label: "Looting",
  },
  {
    value: 19,
    label: "Loyalty",
  },
  {
    value: 20,
    label: "Luck of the Sea",
  },
  {
    value: 21,
    label: "Lure",
  },
  {
    value: 22,
    label: "Mending",
  },
  {
    value: 23,
    label: "Multishot",
  },
  {
    value: 24,
    label: "Piercing",
  },
  {
    value: 25,
    label: "Power",
  },
  {
    value: 26,
    label: "Projectile Protection",
  },
  {
    value: 27,
    label: "Protection",
  },
  {
    value: 28,
    label: "Punch",
  },
  {
    value: 29,
    label: "Quick Charge",
  },
  {
    value: 30,
    label: "Respiration",
  },
  {
    value: 31,
    label: "Riptide",
  },
  {
    value: 32,
    label: "Sharpness",
  },
  {
    value: 33,
    label: "Silk Touch",
  },
  {
    value: 34,
    label: "Smite",
  },
  {
    value: 35,
    label: "Soul Speed",
  },
  {
    value: 36,
    label: "Sweeping Edge",
  },
  {
    value: 37,
    label: "Swift Sneak",
  },
  {
    value: 38,
    label: "Thorns",
  },
  {
    value: 39,
    label: "Unbreaking",
  },
];

export default AddItemDialog;
