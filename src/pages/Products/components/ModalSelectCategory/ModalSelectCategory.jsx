import React from "react";
import PropTypes from "prop-types";
import style from "./ModalSelectCategory.module.scss";
import Modal from "../../../../components/Modal";

const ModalSelectCategory = ({ isOpen, closeOpen, onSelectCategories, categories }) => {
  const selCategories = (e) => {
    const catName = e.target.getAttribute("data-cat");
    onSelectCategories(catName);
    closeOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => closeOpen(false)} title="Список категорий‍">
      <div className={style.modalAddCat}>
        {categories.map((cat, i) => (
          <div key={i} className={style.itemCat} onClick={selCategories} data-cat={cat.name}>
            <span>{cat.name}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
};

ModalSelectCategory.propTypes = {
  isOpen: PropTypes.bool,
  closeOpen: PropTypes.func,
  onSelectCategories: PropTypes.func,
  categories: PropTypes.array
};

ModalSelectCategory.defaultProps = {
  // bla: 'test',
};

export default ModalSelectCategory;
