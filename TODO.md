Your outline is already structurally sound. What it needs is tighter *separation of concerns*, clearer *engineering intent*, and a bit more *production realism* (how these pieces actually behave in a real system). Below is an enhanced, more rigorous version.

---

# React + Vite

(using React + Vite)

## *Libraries / Dependencies*

1. Tailwind CSS
   → Utility-first styling, design system consistency

2. TanStack Query
   → Server-state management (caching, synchronization, background refetching)

3. React Router
   → Client-side routing and navigation control

4. shadcn/ui
   → Prebuilt, composable UI primitives (built on Radix + Tailwind)

---

## *Pointers*

### 1. Project Creation & Folder Structuring

Establish a **scalable, domain-driven structure**, not just file grouping.


* Prefer *feature-based structure* over flat separation:

  
  src/
    features/
      products/
        components/
        hooks/
        api/
        pages/
    shared/
      components/
      hooks/
      utils/
    routes/
    layouts/
  
* Separate:

  * *UI (components)*
  * *logic (hooks)*
  * *data access (API layer)*

---

### 2. Hooks

#### a. Core React Hooks

Manage **component lifecycle and local state**


* useState → local UI state (form inputs, toggles)
* useEffect → side effects (API calls, subscriptions, DOM sync)
* useRef → persistent mutable reference (DOM or value cache)

Key principle:
Avoid overusing useEffect for logic that belongs in *TanStack Query*.

---

#### b. Custom Hooks

Encapsulate reusable logic and enforce separation of concerns


* API abstraction pattern:

  
  useGetProducts()
  useGetProductById(id)
  useCreateProduct()
  useUpdateProduct()
  useDeleteProduct()
  

* Built on top of TanStack:

  * useQuery → GET (cached, reactive)
  * useMutation → POST/PUT/PATCH/DELETE

* Benefits:

  * Reusability
  * Centralized API logic
  * Cleaner components (presentation-focused)

---

### 3. Components

#### a. Custom Components

Domain-specific UI units


* Follow:

  * *Presentational vs Container separation*
  * Controlled inputs for forms
* Keep components:

  * Small
  * Reusable
  * Stateless when possible

---

#### b. Imported Components

External UI primitives


* shadcn/ui → base system
* Optional: Magic UI, Radix primitives

---

### 4. Routing

Declarative navigation and layout composition


* Centralized route definition (e.g., routes.tsx)

* Use:

  * createBrowserRouter
  * RouterProvider

* Support:

  * Nested routes (layouts)
  * Route guards (auth-based rendering)
  * Lazy loading (code splitting)

---

### 5. Authentication Architecture (HOC / Context)

Global auth state + route protection


* *AuthProvider (Context)*

  * Stores:

    * access token
    * user info
  * Handles:

    * login/logout
    * token persistence (localStorage/session)

* Integrates with backend:
  → Django REST Framework + Simple JWT /verify/

---

#### Patterns:

* WithAuth → protected routes
* WithoutAuth → guest-only routes (login/register)

---

### 6. API Integration

Strict, predictable data layer


* Use:

  * Native fetch
  * TanStack Query for orchestration

* Rules:

  * Use BASE_URL as starting url in all fetch
  * No Axios
  * No over-engineered header builders
  * Keep requests *explicit and transparent*

Example principle:

fetch("/api/products", {
  headers: {
    Authorization: `Bearer ${token}`
  }
})

* Let TanStack handle:

  * caching
  * retries
  * invalidation
  * background sync

---

# Django

(using Django + Django REST Framework)

## *Libraries / Frameworks*

1. Django REST Framework

   * Filtering (django-filter)
   * JWT Authentication (Simple JWT)

2. Pillow
   → Image/file handling

3. django-cors-headers
   → Cross-origin request handling

---

## *Pointers*

### 1. Project Creation & Folder Structuring

Build modular, decoupled apps


project/
  apps/
    users/
    products/
    orders/
  core/
    settings/
    urls.py

* Separate:

  * *Domain apps* (business logic)
  * *Core config* (settings, middleware)

---

### 2. Request–Response Lifecycle (Critical Insight)

Understand this flow before coding anything:


Request
 → urls.py
 → views.py
 → serializers.py
 → models.py
 → Database

Response
 ← serializers.py
 ← views.py

---

### 3. File Responsibilities (Refined)

#### *models.py*

Data schema + domain logic


* Defines DB structure and relationships
* Encapsulates business rules at the data level
* Should NOT contain request logic

---

#### *serializers.py*

Data validation + transformation layer


* Validates incoming data
* Shapes outgoing API responses
* Prevents direct exposure of models

---

#### *views.py*

Orchestrates request handling


* Coordinates:

  * models
  * serializers
  * permissions
* Should stay *thin*:
  → heavy logic belongs in models/services

---

### 4. Additional Core Files

#### *urls.py*

Routing layer


* Connects endpoints to views/viewsets
* Uses DRF routers for RESTful patterns

---

#### *admin.py*

Admin interface configuration


* Rapid data inspection and CRUD
* Not a replacement for your API

---

#### *apps.py*

App configuration and initialization


---

### 5. Authentication (JWT Flow)

Stateless authentication using Simple JWT


Flow:

Login → access + refresh token
Access token → API requests
Verify endpoint → frontend validation
Refresh token → renew access

---

### 6. Filtering, Pagination, Optimization

* Filtering → django-filter
* Pagination → DRF settings
* Query optimization:

  * select_related (FK)
  * prefetch_related (M2M)

---
# Remedial Activity
## Simple Inventory-Tracker

#### *Objectives*
* Auth (Register and Login)
    > Create dedicated pages for Register and Login or merge them in one page
* Admin (Protected routes, for admin only)
    - Shows how many products are there
    - Shows how many products' stock are lower than 20
    - Shows how many users are there
    - Shows how many users are admin and normal user
* Products
    - Shows all products
    - Can perform C.R.U.D.
        > Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete
* Categories
    - Shows all categories
    - Can perform C.R.U.D.
        > Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete
* Warehouses
    - Shows all warehouses
    - Can perform C.R.U.D.
        > Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete
* Profile
    - Display the logged in user profile
    - User edit functions:
        - Dedicated page or modal for editing user's profile
        - Use Profile page and replace all text in user informations with input["text"]

#### *Bonus*
* On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
* Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
* Display counts in Admin panel using ShadCN Charts components
* Admin panel can view other people's profile from admin panel all users
    - Create dedicated page for viewing other users' profile
    - Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]

Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile page

Simple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile pageSimple Inventory-Tracker
Objectives
Auth (Register and Login)
Create dedicated pages for Register and Login or merge them in one page

Admin (Protected routes, for admin only)
Shows how many products are there
Shows how many products' stock are lower than 20
Shows how many users are there
Shows how many users are admin and normal user
Products
Shows all products
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Categories
Shows all categories
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Warehouses
Shows all warehouses
Can perform C.R.U.D.
Create dedicated pages for View, Create, and Update (Delete can be a Dialog Component) or simply create a reusable popup or modal component for View, Create, Update, and Delete

Profile
Display the logged in user profile
User edit functions:
Dedicated page or modal for editing user's profile
Use Profile page and replace all text in user informations with input["text"]
Bonus
On Category and Warehouse View page/modal, show all products related to the viewed category or warehouse using querySet reverse call (model attribute "related_name") or using product query-params (api/products/?category=8 or api/products/?warehouse=4)
Can filter (search, via: category or warehouse) and sort (ASC/DESC (Default)) on Products, Categories, and Warehouses
Display counts in Admin panel using ShadCN Charts components
Admin panel can view other people's profile from admin panel all users
Create dedicated page for viewing other users' profile
Reuse Profile page






#### NOTES
* Higher Order Component (HOC) - Component that runs before a component.
  - withAuth
  - withoutAuth
  - AuthProvider
