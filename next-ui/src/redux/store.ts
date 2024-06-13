import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { productApi } from './action/productApi';
import userReducer from './user/reducer';
import { invoiceApi } from './action/invoiceApi';
import { javaUserApi } from './action/javaUserApi';
import { invoiceJavaApi } from './action/invoiceJavaAction';
import { mysqlApi } from './action/mysqlApi';
import { warehouseApi } from './action/warehouseApi';
import { javaWarehouseApi } from './action/javaWarehouseApi';
import { supplierApi } from './action/supplierApi';
import { javaProduct } from './action/javaProduct';
import { javaCatalogApi } from './action/javaCatalogApi';
import { userApi } from './action/userApi';
import { catalogApi } from './action/catalogApi';

const reducer = {
  userReducer,
  [productApi.reducerPath]: productApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [javaUserApi.reducerPath]: javaUserApi.reducer,
  [invoiceJavaApi.reducerPath]: invoiceJavaApi.reducer,
  [mysqlApi.reducerPath]: mysqlApi.reducer,
  [warehouseApi.reducerPath]: warehouseApi.reducer,
  [javaWarehouseApi.reducerPath]: javaWarehouseApi.reducer,
  [supplierApi.reducerPath]: supplierApi.reducer,
  [javaProduct.reducerPath]: javaProduct.reducer,
  [javaCatalogApi.reducerPath]: javaCatalogApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      catalogApi.middleware,
      productApi.middleware,
      invoiceApi.middleware,
      javaUserApi.middleware,
      invoiceJavaApi.middleware,
      mysqlApi.middleware,
      warehouseApi.middleware,
      javaWarehouseApi.middleware,
      supplierApi.middleware,
      javaProduct.middleware,
      javaCatalogApi.middleware,
      userApi.middleware,
    ]),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
