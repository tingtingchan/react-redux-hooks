import React from "react";
import { createSelector } from "reselect";

const getProduct = (state, id) => state.byId[id];

const visibleIdsSelector = state => state.products.visibleIds;
