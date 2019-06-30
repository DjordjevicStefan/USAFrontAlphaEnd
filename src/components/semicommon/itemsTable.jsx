import React, { Component } from "react";

class ItemsTable extends Component {

  render() {
    const {
      selectedRoom,
      itemsTableShow,
      submitNew,
      onChangeNew,
      onChange,
      editItem,
      deleteItem,
      newItem
    } = this.props;
    const room = selectedRoom.room.name;

    return (
      <>
        <table
          className={`table table-bordered ${
            itemsTableShow === false ? "item-table-show" : null
          }`}
        >
          <thead>
            <tr>
              <th scope="col">Item name,subcategory and price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="padding-b">
                <form >
                  <div className="form-group row">
                    <label className="col col-form-label form-control-sm">
                      Name:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="name"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.name}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Subcategory:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="subCategory"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.subCategory}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Price:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="price"
                        step=".01"
                        type="number"
                        className="form-control form-control-sm"
                        value={newItem.price}
                      />
                    </div>
                    <label className="col col-form-label form-control-sm">
                      Link:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChangeNew}
                        name="link"
                        type="text"
                        className="form-control form-control-sm"
                        value={newItem.link}
                      />
                    </div>
                  </div>
                </form>
              </td>
              <td className="padding-b">
                <button
                  onClick={() => submitNew(room)}
                  className="btn-table-end btn-line-hight"

                >
                  Add
                </button>
              </td>
            </tr>
            {selectedRoom.items.length === 0 ? (
              <tr>
                <td>There is no items in this room</td>
              </tr>
            ) : (
              selectedRoom.items.map(item => (
                <tr key={item._id}>
                  <td className="padding-b">
                    <form className="form-items">
                      <div className="form-group row">
                        <label className="col col-form-label form-control-sm">
                          Name:
                        </label>
                        <div className="col-sm-2">
                          <input
                            value={item.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                          />
                        </div>
                        <label className="col col-form-label form-control-sm">
                          Subcategory:
                        </label>
                        <div className="col-sm-2">
                          <input
                            value={item.subCategory}
                            onChange={onChange}
                            name="subCategory"
                            type="text"
                            className="form-control form-control-sm"
                            id={item._id}
                          />
                        </div>
                        <label className="col col-form-label form-control-sm">
                          Price:
                        </label>
                        <div className="col-sm-2">
                          <input
                            value={item.price}
                            onChange={onChange}
                            id={item._id}
                            name="price"
                            step=".01"
                            type="number"
                            className="form-control form-control-sm"
                          />
                        </div>
                        <label className="col col-form-label form-control-sm">
                      Link:
                    </label>
                    <div className="col-sm-2">
                      <input
                        onChange={onChange}
                        name="link"
                        type="text"
                        className="form-control form-control-sm"
                        value={item.link}
                        id={item._id}
                      />
                    </div>
                      </div>
                    </form>
                  </td>
                  <td className="padding-b">
                    <button
                      onClick={() => editItem(item)}
                      className="btn btn-sm mdc-button mb-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteItem(item._id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </>
    );
  }
}

export default ItemsTable;
