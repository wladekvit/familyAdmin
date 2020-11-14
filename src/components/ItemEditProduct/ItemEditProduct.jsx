import React, { useState } from "react";
import PropTypes from "prop-types";
import s from "./ItemEditProduct.module.scss";
import Icon from "../Icon/Icon";
import Button from "../Button";
import updateProducts from "../../queries/updateProducts";
import { restRequest } from "../../utils/restRequest";
import removeProducts from "../../queries/removeProducts";

const ItemEditProduct = ({ product, units, updatingProducts }) => {
  const [editMode, setEditMode] = useState(false);
  const [delMode, setDelMode] = useState(false);
  const [unitMode, setUnitMode] = useState(false);
  const [editMessage, setEditMessage] = useState("");
  const [selUnit, setSelUnit] = useState(product.unit);
  const [selName, setSelName] = useState(product.name);

  const onChangeUnitValue = (e) => {
    if (!delMode && !editMode && (!unitMode || unitMode)) {
      if (selUnit !== e.target.value) {
        const unitName = units.find((ob) => ob._id === +e.target.value).unit;
        // console.log(product);
        // console.log(units);
        setSelUnit(e.target.value);
        setEditMessage(`установить в (${unitName.toUpperCase()})`);
        setUnitMode(true);
      }
    }
  };
  const onChangeNameValue = (e) => {
    if (product.name !== e.target.value) {
      setSelName(e.target.value);
      setEditMessage(`заменить на (${e.target.value})`);
    }
  };
  const onChangeEditMode = () => {
    if (!delMode && !unitMode && (editMode || !editMode)) {
      setEditMode(true);
      setEditMessage(`заменить на (${selName})`);
    }
  };
  const onCancel = () => {
    setSelUnit(product.unit);
    setSelName(product.name);
    setEditMode(false);
    setDelMode(false);
    setUnitMode(false);
  };
  const onDeleteItem = () => {
    if (!editMode && !unitMode && (delMode || !delMode)) {
      setDelMode(true);
      setEditMessage("хочешь удалить");
    }

  };
  const onConfirmAction = () => {
    if (editMode || unitMode) {
      updateProduct().then(() => {
        setEditMode(false);
        setUnitMode(false);
      });
    } else if (delMode) {
      removingProducts().then();
    }
  };

  const updateProduct = async () => {
    const objParams = updateProducts(product._id, selName, selUnit);
    const data = await restRequest(objParams);
    if (data && data.hasOwnProperty("error")) {
      onCancel();
    } else {
      updatingProducts();
    }
  }
  const removingProducts = async () => {
    const objParams = removeProducts(product._id);
    try {
      const data = await restRequest(objParams);
      if (data && data.hasOwnProperty("error")) {
        setEditMessage(`нельзя его удалять!!!`);
      } else {
        onCancel();
        updatingProducts();
      }
    } catch (e) {
      setEditMessage(`что-то не так`);
    }

  }


  return (
    <div className={s.wrapper}>
      <div>
        {!editMode && <span>{selName}</span>}
        {editMode && <input value={selName} onChange={onChangeNameValue} />}
      </div>
      <div>
        <select value={selUnit} onChange={onChangeUnitValue}>
          {units.map((item) => (
            <option key={item._id} value={item._id}>
              {item.unit}
            </option>
          ))}
        </select>
      </div>
      <div onClick={onChangeEditMode}>
        <Icon name={editMode ? "save" : "bird"} />
      </div>
      <div onClick={onDeleteItem}>
        <Icon name="trash" />
      </div>
      {(editMode || delMode || unitMode) && (
        <div>
          <Button
            title={editMessage}
            clickCallBack={onConfirmAction}
            style={{ backgroundColor: "#3d9245" }}
            className={s.customButton}
          />
        </div>
      )}
      {(editMode || delMode || unitMode) && (
        <div>
          <Button
            title="отмена"
            style={{ backgroundColor: "#ee4735" }}
            clickCallBack={onCancel}
            className={s.customButton}
          />
        </div>
      )}
    </div>
  );
};

ItemEditProduct.propTypes = {
  product: PropTypes.object,
  units: PropTypes.arrayOf(PropTypes.object),
  updatingProducts: PropTypes.func
};

ItemEditProduct.defaultProps = {};

export default ItemEditProduct;
