import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import s from "./ItemEditProduct.module.scss";
import Icon from "../Icon/Icon";
import Button from "../Button";
import updateProducts from "../../queries/updateProducts";
import { restRequest } from "../../utils/restRequest";
import removeProducts from "../../queries/removeProducts";
import cn from "classnames/bind";
import ModalContext from "../ModalContext";

const cx = cn.bind(s);

const MODE = {
  noMode: 0,
  editMode: 1,
  unitMode: 2,
  delMode: 3
};

const ItemEditProduct = ({ product, units, updatingProducts }) => {
  const { setParamsIfoModal } = useContext(ModalContext);
  const [editMessage, setEditMessage] = useState("");
  const [selUnit, setSelUnit] = useState(product.unit);
  const [selName, setSelName] = useState(product.name);
  const [settingMode, setSettingMode] = useState(MODE.noMode);

  const onChangeUnitValue = (e) => {
    const unitName = units.find((ob) => ob._id === +e.target.value).unit;
    setSettingMode(MODE.unitMode);
    setEditMessage(`установить в (${unitName.toUpperCase()})`);
    setSelUnit(e.target.value);
  };

  const onChangeEditMode = () => {
    setSettingMode(MODE.editMode);
    setEditMessage("сохранить");

  };
  const onChangeDeleteItem = () => {
    setSettingMode(MODE.delMode);
    setEditMessage("хочешь удалить");
  };
  const onChangeNameValue = (e) => {
    setSelName(e.target.value);
  };

  const onCancel = () => {
    setSelUnit(product.unit);
    setSelName(product.name);
    setSettingMode(MODE.noMode);
  };
  const onConfirmAction = () => {
    if (settingMode === MODE.editMode || settingMode === MODE.unitMode) {
      updateProduct().then(() => {
        setSettingMode(MODE.noMode);
      });
    } else if (settingMode === MODE.delMode) {
      removingProducts().then(() => {
        setSettingMode(MODE.noMode);
      });
    }
  };
  const updateProduct = async () => {
    const objParams = updateProducts(product._id, selName, selUnit);
    const data = await restRequest(objParams);
    if (data && data.hasOwnProperty("error")) {
      onCancel();
      setParamsIfoModal(true, "Что-то пошло не так. Сервер не отвечает", false);
    } else {
      updatingProducts("Название продукта успешно обновлено");
    }
  };
  const removingProducts = async () => {
    const objParams = removeProducts(product._id);
    const name = product.name;
    try {
      const data = await restRequest(objParams);
      if (data && data.hasOwnProperty("error")) {
        setParamsIfoModal(true, data.error, false, 6000);
      } else {
        onCancel();
        const mess = `Товар ${name} успешно удален из базы`
        updatingProducts(mess);
      }
    } catch (e) {
      setEditMessage(`что-то не так`);
    }
  };
  const getDisableButtons = () => {
    return (settingMode === MODE.editMode && product.name !== selName) ||
      settingMode === MODE.delMode ||
      settingMode === MODE.unitMode;
  };

  return (
    <div className={s.wrapper}>
      <div>
        {settingMode !== MODE.editMode && <span>{selName}</span>}
        {settingMode === MODE.editMode && <input value={selName} onChange={onChangeNameValue} />}
      </div>
      {(settingMode === MODE.noMode || settingMode === MODE.unitMode) && (
        <div className={cx({ fullSpas:  settingMode === MODE.unitMode})}>
          <select value={selUnit} onChange={onChangeUnitValue}>
            {units.map((item) => (
              <option key={item._id} value={item._id}>
                {item.unit}
              </option>
            ))}
          </select>
        </div>
      )}
      {(settingMode === MODE.noMode || settingMode === MODE.editMode) && (
        <div className={cx({ fullSpas:  settingMode === MODE.editMode})} onClick={onChangeEditMode}>
          <Icon name={settingMode === MODE.editMode ? "save" : "bird"} />
        </div>
      )}
      {(settingMode === MODE.noMode || settingMode === MODE.delMode) && (
        <div className={cx({ fullSpas:  settingMode === MODE.delMode})} onClick={onChangeDeleteItem}>
          <Icon name="trash" />
        </div>
      )}
      {settingMode !== MODE.noMode && (
        <div className={s.buttonAction}>
          <Button
            title={editMessage}
            clickCallBack={onConfirmAction}
            style={{ backgroundColor: "#3d9245" }}
            className={s.customButton}
            disable={getDisableButtons()}
          />
        </div>
      )}
      {settingMode !== MODE.noMode && (
        <div className={s.buttonCancel}>
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
