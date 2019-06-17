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
                <form>
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label form-control-sm">
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
                    <label className="col-sm-2 col-form-label form-control-sm">
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
                    <label className="col-sm-2 col-form-label form-control-sm">
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
                  </div>
                </form>
              </td>
              <td className="padding-b">
                <button
                  onClick={() => submitNew(room)}
                  className="btn-table-end btn-line-hight"
                >
                  Add new
                </button>
              </td>
            </tr>
            {selectedRoom.errorMsg ? (
              <tr>
                <td>There is no items in this room</td>
              </tr>
            ) : (
              selectedRoom.items.map(item => (
                <tr key={item._id}>
                  <td className="padding-b">
                    <form>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label form-control-sm">
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
                        <label className="col-sm-2 col-form-label form-control-sm">
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
                        <label className="col-sm-2 col-form-label form-control-sm">
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
                      </div>
                    </form>
                  </td>
                  <td className="padding-b">
                    <button
                      onClick={() => editItem(item)}
                      className="btn btn-sm mdc-button mr-1"
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
