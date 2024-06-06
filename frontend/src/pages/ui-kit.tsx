import Modal from "@/components/modal";
import LayoutLoggedInUser from "@/layouts/layout-logged-in-user";
import React from "react";

export default function UiKit() {
  return (
    <LayoutLoggedInUser>
      <div className="flex gap-6 p-4">
        <div className="flex flex-col gap-2">
          <button className="btn-xs btn-reef">Super xs reef button</button>
          <button className="btn-sm btn-anchor">Super sm anchor button</button>
          <button className="btn btn-shore">Super shore button</button>
          <button className="btn-lg btn-error">Super lg error button</button>
          <button className="btn-xl btn-success">
            Super xl success button
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <button className="btn-xs btn-outline-reef">
            Super xs reef outline button
          </button>
          <button className="btn-sm btn-outline-anchor">
            Super sm anchor outline button
          </button>
          <button className="btn btn-outline-shore">
            Super outline shore button
          </button>
          <button className="btn-lg btn-outline-error">
            Super lg error outline button
          </button>
          <button className="btn-xl btn-outline-success">
            Super xl success outline button
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input-text-xs"
            placeholder="Super xs input text ..."
            required
          />
          <input
            type="text"
            className="input-text-sm"
            placeholder="Super sm input text ..."
            required
          />
          <input
            type="password"
            className="input-text"
            placeholder="Super input text ..."
            required
          />
          <input
            type="text"
            className="input-text-lg"
            placeholder="Super lg input text ..."
            required
          />
          <input
            type="text"
            className="input-text-xl"
            placeholder="Super xl input text ..."
            required
          />
          <input
            type="text"
            className="input-text-reef"
            value="Super input reef text ..."
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Modal
            modalButtonTitle="My first super reef modal"
            content={<div className="p-4">Wow ça fonctionne !</div>}
            buttonClasses="btn-xs btn-reef"
          />
          <Modal
            buttonClasses="btn-sm btn-anchor"
            modalButtonTitle="My second super anchor modal"
            content={
              <div className="p-4">Wow ça fonctionne une seconde fois !</div>
            }
          />
          <Modal
            buttonClasses="btn btn-shore"
            modalButtonTitle="My third super shore modal"
            content={
              <div className="p-4">Wow ça fonctionne une troisième fois !</div>
            }
          />
          <Modal
            buttonClasses="btn-lg btn-error"
            modalButtonTitle="My fourth super error modal"
            content={
              <div className="p-4">Wow ça fonctionne une quatrième fois !</div>
            }
          />
          <Modal
            buttonClasses="btn-xl btn-success"
            modalButtonTitle="My fifth super success modal"
            content={
              <div className="p-4">Wow ça fonctionne une cinquième fois !</div>
            }
          />
        </div>
        <div></div>
        <div className="flex flex-col gap-2">
          <select className="select-xs select-arrow" name="" id="">
            <option value="">Super xs select</option>
          </select>
          <select className="select-sm select-arrow" name="" id="">
            <option value="">Super sm select</option>
          </select>
          <select className="select select-arrow" name="" id="">
            <option value="">Super select</option>
          </select>
          <select className="select-lg select-arrow" name="" id="">
            <option value="">Super lg select</option>
          </select>
          <select className="select-xl select-arrow" name="" id="">
            <option value="">Super xl select</option>
          </select>
        </div>
      </div>
    </LayoutLoggedInUser>
  );
}
