export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export interface CustomerInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface CustomerAccessTokenInput {
  email: string;
  password: string;
}

export type user = {
  customer: {
    id?: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone?: string | null;
    acceptsMarketing: boolean;
  };
};

export type userOperation = {
  data: user;
  variables: {
    input: string;
  };
};

export type CustomerError = {
  code: string;
  field: string[];
  message: string;
};

export type registerOperation = {
  data: {
    customerCreate: {
      customer: user;
      customerUserErrors: CustomerError;
    };
  };
  variables: {
    input: CustomerInput;
  };
};

export interface ShopifyCustomer {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptsMarketing: boolean;
  phone: string;
}

export type Cart = Omit<ShopifyCart, "lines"> & {
  lines: CartItem[];
};

export type PageInfo = {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  endCursor: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  path?: string;
  products?: {
    edges: Array<ShopifyProduct>;
  };
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  compareAtPriceRange: {
    maxVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  vendor: string;
  collections: any;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: {
        pageInfo: PageInfo;
        edges: Edge<ShopifyProduct>[];
      };
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: Page };
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<Page>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: {
      pageInfo: PageInfo;
      edges: Edge<ShopifyProduct>[];
    };
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    cursor?: string;
  };
};

export type UserProfile = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  id: string;
};
export type ProfileMeEditReq = Omit<UserProfile, "id" | "createdAt">;
export type ProfileMe = Omit<UserProfile, "id">;

export type LoginResponse = Readonly<{
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: UserProfile;
}>;

export type CreateProduct = {
  name: string;
  description?: string;
  price: number;
  category?: string;
  categoryId: number;
  imageUrl?: string;
  slug: string;
};
export type StatusSuccessful = {
  success: true;
  status?: string | number;
  errors?: undefined;
  error?: undefined;
  serverErrors?: undefined;
};

export type StatusUnsuccessful = {
  success: false;
  status?: string | number;
  errors?: Record<string, string[]>;
  error?: string | Array<{ message: string }>;
  serverErrors?: Record<string, string[]>;
};

export type StatusErrors = StatusSuccessful | StatusUnsuccessful;
export type CreateProductResponse = (CreateProduct & StatusErrors) & {
  id?: number;
};

export type EditProduct = Partial<CreateProduct> & { id: number; slug: string };
export type EditProductResponse = EditProduct & StatusErrors;

export type ForgotPass = {
  email?: string;
};
export type ForgotPassResponse = ForgotPass & StatusErrors;

export type ResetPass = {
  password: string;
  password2: string;
  token: string;
};
export type ResetPassResponse = ResetPass & StatusErrors;

export interface ImageData {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImageDetails;
  thumb: ImageDetails;
  medium: ImageDetails;
  delete_url: string;
}

export interface ImageDetails {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
}

export interface ImgBBResponse {
  data: ImageData;
  success: boolean;
  status: number;
}

export interface ErrorResponse {
  code: number;
  message: string;
  internal_code: string;
}

export interface InternalErrorResponse {
  error: ErrorResponse;
}
