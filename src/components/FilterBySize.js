import React from "react";

export function FilterBySize(props) {
  return (
    <div>
      <label>
        Filter Size
        <select
          className="form-control"
          value={props.size}
          onChange={props.handleSizeChange}
        >
          {props.sizeRange.map(size => {
            return <option value={size}>{size}</option>;
          })}
        </select>
      </label>
    </div>
  );
}
