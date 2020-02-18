import React from "react";

interface Props {
  size?: string;
  sizeRange: Array<string>;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterBySize: React.FC<Props> = ({
  size,
  sizeRange,
  handleSizeChange
}) => {
  return (
    <div>
      <label>
        Filter Size
        <select
          className="form-control"
          value={size}
          onChange={handleSizeChange}
        >
          {sizeRange.map(size => {
            return <option value={size}>{size}</option>;
          })}
        </select>
      </label>
    </div>
  );
};
