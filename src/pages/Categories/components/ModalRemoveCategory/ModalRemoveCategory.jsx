import React from "react";
import PropTypes from "prop-types";
import style from "./ModalRemoveCategory.module.scss";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";

const ModalRemoveCategory = ({ isOpen, closeOpen, name, onClickRemoveCategories}) => {
  
  return (
    <Modal isOpen={isOpen} onRequestClose={() => closeOpen(false)} title="Удаление категории 💀">
      <div className={style.modalAddCat}>
        <div className={style.message}>
          <span>{`🚽 Что, на самом деле хочешь удалить эту категорию - "${name.toUpperCase()}"?`}</span>
        </div>
        <Button title="удалить" clickCallBack={() => onClickRemoveCategories(name)} />
        <Button
          title="отменить"
          clickCallBack={() => closeOpen(false)}
          className={style.buttonTopMargin}
        />
      </div>
    </Modal>
  );
};

ModalRemoveCategory.propTypes = {
  isOpen: PropTypes.bool,
  closeOpen: PropTypes.func,
  name: PropTypes.string
};

ModalRemoveCategory.defaultProps = {
  name: ""
};

export default ModalRemoveCategory;
