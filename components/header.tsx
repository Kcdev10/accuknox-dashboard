import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toogle } from "@/redux/slices/sideNav";
import { addWidget, removeWidget, showWidget } from "@/redux/slices/widgetData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiBellOn } from "react-icons/ci";
import { MdDeleteForever, MdOutlineCreateNewFolder } from "react-icons/md";

export default function Header() {
  const { isOpen, categoryId } = useAppSelector((state) => state.sideNav);
  const { categories } = useAppSelector((state) => state.widgetData);
  const [activeCategory, setActiveCategory] = useState(categoryId);
  const [showCreateModal, setCreateModal] = useState(false);
  const [searchList, setSearchList] = useState<
    { name: string; text: string; isShow: boolean }[]
  >([]);
  const [categoryName, setCategoryName] = useState(
    categories[activeCategory].name
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useAppDispatch();

  const createWidget = () => {
    const widgetDetails = {
      category: categoryName,
      title,
      description,
    };

    dispatch(addWidget(widgetDetails));
    setTitle(""), setDescription("");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const serachVal = e.target.value;
    console.log(serachVal);
    if (serachVal) {
      const searchDataList = categories.flatMap((item) => {
        return item.widgets.filter(
          (itm) =>
            itm.name
              .toLocaleLowerCase()
              .includes(serachVal.toLocaleLowerCase()) ||
            itm.text.toLocaleLowerCase().includes(serachVal.toLocaleLowerCase())
        );
      });
      setSearchList([...searchDataList]);
    } else {
      setSearchList([]);
    }
  };

  console.log(categoryId);

  return (
    <header className="md:px-16 px-4 py-4">
      <nav className="flex md:flex-row flex-col gap-2 md:justify-between md:items-center">
        <div className="flex flex-1 gap-2 font-medium capitalize text-sm">
          <Link href={"/"} className="text-gray-400">
            Home
          </Link>
          <span className="text-gray-400">&gt;</span>
          <Link href={"/"} className="text-blue-950 font-bold">
            dashboard v2
          </Link>
        </div>

        <div className="flex flex-1 gap-2 items-center justify-between">
          <div className="md:w-1/2 flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="search anything"
                className="bg-blue-50 border border-gray-200 px-4 py-1 rounded-sm outline-none text-sm w-full"
                onChange={(e) => handleSearch(e)}
              />

              <div
                className="absolute top-[100%] left-0 w-full h-auto bg-blue-100 rounded-b-md duration-200 origin-top"
                style={{
                  transform: searchList.length > 0 ? "scaleY(1)" : "scaleY(0)",
                }}
              >
                <ul>
                  {searchList.map((item, index) => (
                    <li
                      className="py-1 px-2 text-sm hover:bg-gray-200 duration-200 cursor-pointer"
                      key={index}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <CiBellOn size={20} color="#afaeae" />
            </div>
          </div>
          <div className="text-gray-400 cursor-pointer font-medium text-sm">
            Setting
          </div>
        </div>
      </nav>

      {/* side bar  */}

      <div
        className="fixed top-0 right-0 md:w-1/2 bg-gray-100 shadow-lg h-screen duration-700 transition-all"
        style={{
          transform: isOpen ? "translateX(0%)" : "translateX(100%)",
        }}
      >
        <div className="w-full h-12 bg-blue-950 px-6 flex justify-between items-center text-white">
          <span className="text-sm font-medium text-gray-300"> Add Widget</span>{" "}
          <span
            className="font-bold cursor-pointer"
            onClick={() => {
              dispatch(toogle(0));
            }}
          >
            X
          </span>
        </div>

        <div className="px-5 mt-3">
          <div className="flex justify-between items-center">
            <p>personalise your dashboard by adding the following widget</p>
            <div
              className="text-sm flex items-center gap-1 bg-gray-200 p-2 cursor-pointer shadow-md border border-gray-300"
              onClick={() => setCreateModal(!showCreateModal)}
            >
              <MdOutlineCreateNewFolder size={16} />
              Create
            </div>
          </div>

          <div className="w-fit">
            <div className="flex gap-4 items-center text-xs font-semibold mt-2">
              {categories.map((item, index) => (
                <div
                  key={index}
                  className={`cursor-pointer duration-200 ${
                    activeCategory == index
                      ? "border-b-blue-900 border-b-2 text-blue-950"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setActiveCategory(index);
                    setCategoryName(item.name);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {categories[activeCategory].widgets.map((item, index) => (
              <div
                key={index}
                className="w-full p-2 bg-gray-100 border rounded-sm text-sm flex justify-between gap-2 items-center"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.isShow}
                    onChange={(e) => {
                      dispatch(
                        showWidget({
                          item,
                          category: categoryName,
                        })
                      );
                    }}
                  />
                  {item.name}
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      removeWidget({
                        item,
                        category: categoryName,
                      })
                    );
                  }}
                >
                  <MdDeleteForever size={20} className="text-red-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 w-full p-4 flex justify-end">
          <div className="flex gap-2 text-sm">
            <button
              className="rounded-md border border-blue-950 py-2 px-4"
              onClick={() => dispatch(toogle(0))}
            >
              Cancel
            </button>
            <button className="rounded-md border border-blue-950 bg-blue-950 text-white py-2 px-4">
              Confirm
            </button>
          </div>
        </div>

        {showCreateModal && (
          <div className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 p-2 border border-gray-300 rounded-md flex flex-col gap-2 transition-all duration-200 shadow-lg">
            <div className="flex justify-end">
              <span
                className="text-sm font-bold cursor-pointer"
                onClick={() => setCreateModal(!showCreateModal)}
              >
                X
              </span>
            </div>

            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="tilte"
                className="w-full text-sm px-4 py-2 outline-none bg-blue-500/10"
              />
            </div>

            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="description"
                className="text-sm w-full px-4 py-2 outline-none bg-blue-500/10 resize-none"
              />
            </div>

            <div className="flex">
              <button
                className="bg-blue-950 rounded-sm text-sm text-white px-6 py-2"
                onClick={() => createWidget()}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
