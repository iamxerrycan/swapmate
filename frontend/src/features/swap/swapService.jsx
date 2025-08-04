// src/features/swap/swapService.js

import {
  createSwapRequestAPI,
  getSwapRequestByIdAPI,
  updateSwapRequestAPI,
  deleteSwapRequestAPI,
  getAllSwapRequestsAPI,
  acceptSwapRequestAPI,
  rejectSwapRequestAPI,
  cancelSwapRequestAPI,
  getMySwapsAPI,
} from './swapAPI';

// CREATE swap item
export const createSwapItem = async (itemData) => {
  const res = await createSwapRequestAPI(itemData);
  return res;
};

// GET all swap items
export const getAllSwapItems = async () => {
  const res = await getAllSwapRequestsAPI();
  return res;
};

// GET single swap item by ID
export const getSwapItemById = async (id) => {
  const res = await getSwapRequestByIdAPI(id);
  return res;
};

// UPDATE swap item
export const updateSwapItem = async ({ id, updatedData }) => {
  const res = await updateSwapRequestAPI(id, updatedData);
  return res;
};

// DELETE swap item
export const deleteSwapItem = async (id) => {
  const res = await deleteSwapRequestAPI(id);
  return res;
};

// GET My Swap Requests
export const getMySwaps = async (token) => {
  const res = await getMySwapsAPI(token);
  return res;
};

//  ACCEPT a Swap Request
export const acceptSwapRequest = async (id, token) => {
  const res = await acceptSwapRequestAPI(id, token);
  return res;
};

// REJECT a Swap Request
export const rejectSwapRequest = async (id, token) => {
  const res = await rejectSwapRequestAPI(id, token);
  return res;
};

//  CANCEL a Swap Request
export const cancelSwapRequest = async (id, token) => {
  const res = await cancelSwapRequestAPI(id, token);
  return res;
};
