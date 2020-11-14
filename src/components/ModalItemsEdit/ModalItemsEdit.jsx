import React from "react";
import PropTypes from "prop-types";
import s from "./ModalItemsEdit.module.scss";
import Modal from "../Modal";
import ItemEditProduct from "../ItemEditProduct";

const ModalItemsEdit = ({ isOpen, closeOpen, products, units, update }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={() => closeOpen(false)} title="Товары">
      <div className={s.wrapper}>
        {products.map((prod) => (
          <ItemEditProduct key={prod._id} product={prod} units={units} updatingProducts={update} />
        ))}
      </div>
    </Modal>
  );
};

ModalItemsEdit.propTypes = {
  isOpen: PropTypes.bool,
  closeOpen: PropTypes.func,
  products: PropTypes.arrayOf(PropTypes.object),
  units: PropTypes.arrayOf(PropTypes.object),
  update: PropTypes.func
};

ModalItemsEdit.defaultProps = {};

export default ModalItemsEdit;
