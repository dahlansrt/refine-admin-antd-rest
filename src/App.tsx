import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { ErrorComponent, ThemedLayoutV2, useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  NavigateToResource,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { AntdCreateInferencer, AntdEditInferencer, AntdInferencer, AntdShowInferencer } from "@refinedev/inferencer/antd";
import { DashboardPage } from "./pages/dashboard";
import { ProductList } from "./pages/product";
import { ProductEdit } from "./pages/product/edit";
import { ProductShow } from "./pages/product/show";
import { ProductCreate } from "./pages/product/create";
import { DashboardOutlined } from "@ant-design/icons";

const API_URL = "https://api.fake-rest.refine.dev";
const METRICS_URL = "https://api.finefoods.refine.dev";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={{
                  default: dataProvider(API_URL),
                  metrics: dataProvider(METRICS_URL),
                }}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                resources={[
                  {
                    name: "dashboard",
                    list: "/dashboard",
                    meta: {
                      label: "Dashboard",
                      dataProviderName: "metrics",
                      icon: <DashboardOutlined />
                    },
                  },
                  {
                    // name: "protected-products",
                    name: "products",
                    list: "/products",
                    show: "/products/:id",
                    edit: "/products/edit/:id",
                    clone: "/products/clone/:id",
                    create: "/products/create",
                    meta: {
                      label: "Products", canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    show: "/categories/show/:id",
                    edit: "/categories/edit/:id",
                    clone: "/categories/clone/:id",
                    create: "/categories/create",
                    meta: {
                      label: "Categories", canDelete: true,
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "bVYnZ9-AuTID5-l83JXI",
                }}
              >
                <Routes>
                  <Route element={
                    <ThemedLayoutV2>
                      <Outlet />
                    </ThemedLayoutV2>
                  }>
                    <Route
                      index
                      element={<NavigateToResource resource="products" />}
                    />
                    <Route path="/products">
                      <Route index element={<ProductList />} />
                      <Route path=":id" element={<ProductShow />} />
                      <Route path="edit/:id" element={<ProductEdit />} />
                      <Route path="clone/:id" element={<ProductCreate />} />
                      <Route path="create" element={<ProductCreate />} />
                    </Route>
                    <Route path="posts">
                      <Route index element={<AntdInferencer />} />
                      <Route path="create" element={<AntdInferencer />} />
                    </Route>
                    <Route path="categories">
                      <Route index element={<AntdInferencer />} />
                      <Route path="show/:id" element={<AntdInferencer />} />
                    </Route>
                    <Route path="/dashboard">
                      <Route index element={<DashboardPage />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter >
  );
}

export default App;
