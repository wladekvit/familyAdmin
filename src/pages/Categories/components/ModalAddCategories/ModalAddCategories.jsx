import React, {createRef, useEffect, useState} from "react";
import style from "./ModalAddCategories.module.scss";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import addCategories from "../../../../queries/addCategories";
import { restRequest } from "../../../../utils/restRequest";

const ModalAddCategories = ({ isOpen, closeOpen, onClickAddCategories }) => {
  const [value, setValue] = useState("");
  const inputValue = createRef();
  
  const onChangeValue = (e) => {
    setValue(e.target.value)
  };
  
  useEffect(() => {
    if (!isOpen) {
      setValue("");
    }
  }, [isOpen]);
  
  return (
    <Modal isOpen={isOpen} onRequestClose={() => closeOpen(false)} title="Добавление категории‍">
      <div className={style.modalAddCat}>
        <label>
          Название категории 👁️
          <input type="text" ref={inputValue} onChange={onChangeValue} placeholder="🖋 пиши тут категорию"/>
        </label>
        <Button
          title="добавить"
          clickCallBack={() => onClickAddCategories(inputValue.current.value)}
          disable={value !== ""}
        />
        <Button
          title="отменить"
          clickCallBack={() => closeOpen(false)}
          className={style.buttonTopMargin}
        />
      </div>
    </Modal>
  );
};

ModalAddCategories.propTypes = {
  // bla: PropTypes.string,
};

ModalAddCategories.defaultProps = {
  // bla: 'test',
};

export default ModalAddCategories;
