const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "/products",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Products.vue") }]
  },

  {
    path: "/cart",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Cart.vue") }]
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Admin.vue") }]
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }]
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Register.vue") }]
  },

  {
    path: "/product/:productid",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProductPage.vue") }]
  },

  {
    path: "/profile/:profileid",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }]
  },

  {
    path: "/admin/postfeatured",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/PostFeatured.vue") }
    ]
  },

  {
    path: "/postproduct",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/PostProduct.vue") }
    ]
  },

  {
    path: "/admin/postcarousel",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/admin/PostCarousel.vue") }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
