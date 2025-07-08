export const registerFormControls = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    type: 'text',
    componentType: 'input'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    componentType: 'input'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input'
  }
];


export const loginFormControls = [
 
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
    componentType: 'input'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    componentType: 'input'
  }
];

export const CatagoryFormControls = [
 
  {
    name: 'category',
    label: 'Catagory',
    placeholder: 'Enter catagory',
    type: 'text',
    componentType: 'input'
  },
  //  {
  //   name: 'categoryIcon',
  //   label: 'Catagory Icon',
  //   placeholder: 'Enter catagory icon',
  //   type: 'text',
  //   componentType: 'input'
  // },
  
];

export const SubCatagoryFormControls = [
 
  {
    name: 'subcategory',
    label: 'Sub Catagory',
    placeholder: 'Enter sub catagory',
    type: 'text',
    componentType: 'input'
  },
 {
  name : 'category',
  label : 'Category',
  placeholder : 'Choose category',
  type : 'select',
  componentType : 'select'

 }
  
];

export const BrandFormControls = [
 
  {
    name: 'brandName',
    label: 'Brand',
    placeholder: 'Enter brand',
    type: 'text',
    componentType: 'input'
  },
 
  
];


export const productFormControls = [
  // Foreign keys
  {
    name: "categoryId",
    label: "Category",
    componentType: "select",
    placeholder: "Select category",
    option: [], // fill dynamically from backend
  },
  {
    name: "subcategoryId",
    label: "Subcategory",
    componentType: "select",
    placeholder: "Select subcategory",
    option: [], // fill dynamically from backend
  },
  {
    name: "brandId",
    label: "Brand",
    componentType: "select",
    placeholder: "Select brand",
    option: [], // fill dynamically from backend
  },

  // Basic Info
  {
    name: "productName",
    label: "Product Name",
    componentType: "input",
    type: "text",
    placeholder: "Enter product name",
  },
  {
    name: "featuredDescription",
    label: "Featured Description",
    componentType: "textarea",
    placeholder: "Enter short featured description",
  },
  {
    name: "Description",
    label: "Full Description",
    componentType: "textarea",
    placeholder: "Enter detailed description",
  },

  // Type & Measurements
  {
    name: "type",
    label: "Product Type",
    componentType: "select",
    placeholder: "Select type",
    option: [
      { label: "Solid", value: "Solid" },
      { label: "Gel", value: "Gel" },
      { label: "Liquid", value: "Liquid" },
      { label: "Powder", value: "Powder" },
    ],
  },
  {
    name: "weight",
    label: "Weight",
    componentType: "input",
    type: "number",
    placeholder: "Enter weight",
  },
  {
    name: "weightType",
    label: "Weight Type",
    componentType: "select",
    placeholder: "Select weight unit",
    option: [
      { label: "g", value: "g" },
      { label: "kg", value: "kg" },
      { label: "ml", value: "ml" },
      { label: "L", value: "L" },
    ],
  },
  {
    name: "qty",
    label: "Quantity",
    componentType: "input",
    type: "number",
    placeholder: "Enter available quantity",
  },

  // Pricing
  {
    name: "price",
    label: "Price (₹)",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    name: "offerPrice",
    label: "Offer Price (₹)",
    componentType: "input",
    type: "number",
    placeholder: "Enter discounted price",
  },
  {
    name: "offerType",
    label: "Offer Type",
    componentType: "input",
    type: "text",
    placeholder: "e.g., Flat, Percentage",
  },

  // Images (use file input in UI separately)
  // {
  //   name: "featuredImage",
  //   label: "Featured Image URL",
  //   componentType: "input",
  //   type: "text",
  //   placeholder: "Upload and paste URL",
  // },
  // {
  //   name: "images",
  //   label: "Gallery Images (comma-separated URLs)",
  //   componentType: "textarea",
  //   placeholder: "Upload and paste up to 5 image URLs",
  // },

  // Optional
  {
    name: "tags",
    label: "Tags",
    componentType: "input",
    type: "text",
    placeholder: "Enter tags (comma-separated)",
  },
  {
    name: "ratings",
    label: "Ratings",
    componentType: "input",
    type: "number",
    placeholder: "Enter average rating (optional)",
  },
  {
    name: "reviewsCount",
    label: "Reviews Count",
    componentType: "input",
    type: "number",
    placeholder: "Enter number of reviews (optional)",
  },
  {
    name: "isNewArrival",
    label: "New Arrival?",
    componentType: "select",
    placeholder: "Select status",
    option: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
  },
];



export const addressFormControls = [
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter 10-digit phone number",
    type: "text",
    componentType: "input",
  },
  {
    name: "pincode",
    label: "Pincode",
    placeholder: "Enter 6-digit pincode",
    type: "text",
    componentType: "input",
  },
  {
    name: "locality",
    label: "Locality",
    placeholder: "Enter locality (area/street)",
    type: "text",
    componentType: "input",
  },
  {
    name: "address",
    label: "Full Address",
    placeholder: "Enter full address",
    componentType: "textarea",
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter city name",
    type: "text",
    componentType: "input",
  },
  {
    name: "state",
    label: "State",
    placeholder: "Enter state name",
    type: "text",
    componentType: "input",
  },
  {
    name: "landmark",
    label: "Landmark (Optional)",
    placeholder: "Enter landmark (e.g. near school)",
    type: "text",
    componentType: "input",
  },
  {
    name: "addressType",
    label: "Address Type",
    componentType: "select",
    placeholder: "Select address type",
    option: [
      { label: "Home", value: "Home" },
      { label: "Work", value: "Work" },
      { label: "Other", value: "Other" },
    ],
  },
];
