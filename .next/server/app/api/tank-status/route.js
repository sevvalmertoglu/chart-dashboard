/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/tank-status/route";
exports.ids = ["app/api/tank-status/route"];
exports.modules = {

/***/ "(rsc)/./app/api/tank-status/route.ts":
/*!**************************************!*\
  !*** ./app/api/tank-status/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _app_lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/app/lib/db */ \"(rsc)/./app/lib/db.ts\");\n/* harmony import */ var _app_models_Sale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/models/Sale */ \"(rsc)/./app/models/Sale.ts\");\n\n\n\nasync function GET(request) {\n    try {\n        await (0,_app_lib_db__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        const { searchParams } = new URL(request.url);\n        const tankId = searchParams.get('tankId') || 'all';\n        // 2023 ve 2024 yıllarının başlangıç ve bitiş tarihleri\n        const startDate = new Date('2023-01-01');\n        const endDate = new Date('2024-12-31');\n        // Tank ID'ye göre filtreleme\n        const tankFilter = tankId !== 'all' ? {\n            tankId\n        } : {};\n        const tankStatus = await _app_models_Sale__WEBPACK_IMPORTED_MODULE_2__[\"default\"].aggregate([\n            {\n                $match: {\n                    date: {\n                        $gte: startDate,\n                        $lte: endDate\n                    },\n                    ...tankFilter\n                }\n            },\n            {\n                $sort: {\n                    date: -1\n                }\n            },\n            {\n                $group: {\n                    _id: '$tankId',\n                    name: {\n                        $first: {\n                            $concat: [\n                                '$tankId'\n                            ]\n                        }\n                    },\n                    value: {\n                        $first: '$fill_rate'\n                    },\n                    lastUpdate: {\n                        $first: '$date'\n                    }\n                }\n            }\n        ]);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(tankStatus);\n    } catch (error) {\n        console.error('Tank Status API Error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Tank durumu verileri alınırken bir hata oluştu'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Rhbmstc3RhdHVzL3JvdXRlLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBMkM7QUFDTjtBQUNBO0FBRTlCLGVBQWVHLElBQUlDLE9BQWdCO0lBQ3hDLElBQUk7UUFDRixNQUFNSCx1REFBU0E7UUFFZixNQUFNLEVBQUVJLFlBQVksRUFBRSxHQUFHLElBQUlDLElBQUlGLFFBQVFHLEdBQUc7UUFDNUMsTUFBTUMsU0FBU0gsYUFBYUksR0FBRyxDQUFDLGFBQWE7UUFFN0MsdURBQXVEO1FBQ3ZELE1BQU1DLFlBQVksSUFBSUMsS0FBSztRQUMzQixNQUFNQyxVQUFVLElBQUlELEtBQUs7UUFFekIsNkJBQTZCO1FBQzdCLE1BQU1FLGFBQWFMLFdBQVcsUUFBUTtZQUFFQTtRQUFPLElBQUksQ0FBQztRQUVwRCxNQUFNTSxhQUFhLE1BQU1aLHdEQUFJQSxDQUFDYSxTQUFTLENBQUM7WUFDdEM7Z0JBQ0VDLFFBQVE7b0JBQ05DLE1BQU07d0JBQ0pDLE1BQU1SO3dCQUNOUyxNQUFNUDtvQkFDUjtvQkFDQSxHQUFHQyxVQUFVO2dCQUNmO1lBQ0Y7WUFDQTtnQkFDRU8sT0FBTztvQkFBRUgsTUFBTSxDQUFDO2dCQUFFO1lBQ3BCO1lBQ0E7Z0JBQ0VJLFFBQVE7b0JBQ05DLEtBQUs7b0JBQ0xDLE1BQU07d0JBQUVDLFFBQVE7NEJBQUVDLFNBQVM7Z0NBQUM7NkJBQVU7d0JBQUM7b0JBQUU7b0JBQ3pDQyxPQUFPO3dCQUFFRixRQUFRO29CQUFhO29CQUM5QkcsWUFBWTt3QkFBRUgsUUFBUTtvQkFBUTtnQkFDaEM7WUFDRjtTQUNEO1FBRUQsT0FBT3hCLHFEQUFZQSxDQUFDNEIsSUFBSSxDQUFDZDtJQUMzQixFQUFFLE9BQU9lLE9BQU87UUFDZEMsUUFBUUQsS0FBSyxDQUFDLDBCQUEwQkE7UUFDeEMsT0FBTzdCLHFEQUFZQSxDQUFDNEIsSUFBSSxDQUN0QjtZQUFFQyxPQUFPO1FBQWlELEdBQzFEO1lBQUVFLFFBQVE7UUFBSTtJQUVsQjtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvc2V2dmFsbWVydG9nbHUvRGVza3RvcC9jaGFydC1kYXNoYm9hcmQvYXBwL2FwaS90YW5rLXN0YXR1cy9yb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgY29ubmVjdERCIGZyb20gJ0AvYXBwL2xpYi9kYic7XG5pbXBvcnQgU2FsZSBmcm9tICdAL2FwcC9tb2RlbHMvU2FsZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGF3YWl0IGNvbm5lY3REQigpO1xuXG4gICAgY29uc3QgeyBzZWFyY2hQYXJhbXMgfSA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuICAgIGNvbnN0IHRhbmtJZCA9IHNlYXJjaFBhcmFtcy5nZXQoJ3RhbmtJZCcpIHx8ICdhbGwnO1xuXG4gICAgLy8gMjAyMyB2ZSAyMDI0IHnEsWxsYXLEsW7EsW4gYmHFn2xhbmfEscOnIHZlIGJpdGnFnyB0YXJpaGxlcmlcbiAgICBjb25zdCBzdGFydERhdGUgPSBuZXcgRGF0ZSgnMjAyMy0wMS0wMScpO1xuICAgIGNvbnN0IGVuZERhdGUgPSBuZXcgRGF0ZSgnMjAyNC0xMi0zMScpO1xuXG4gICAgLy8gVGFuayBJRCd5ZSBnw7ZyZSBmaWx0cmVsZW1lXG4gICAgY29uc3QgdGFua0ZpbHRlciA9IHRhbmtJZCAhPT0gJ2FsbCcgPyB7IHRhbmtJZCB9IDoge307XG5cbiAgICBjb25zdCB0YW5rU3RhdHVzID0gYXdhaXQgU2FsZS5hZ2dyZWdhdGUoW1xuICAgICAge1xuICAgICAgICAkbWF0Y2g6IHtcbiAgICAgICAgICBkYXRlOiB7XG4gICAgICAgICAgICAkZ3RlOiBzdGFydERhdGUsXG4gICAgICAgICAgICAkbHRlOiBlbmREYXRlXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi50YW5rRmlsdGVyXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICRzb3J0OiB7IGRhdGU6IC0xIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgICRncm91cDoge1xuICAgICAgICAgIF9pZDogJyR0YW5rSWQnLFxuICAgICAgICAgIG5hbWU6IHsgJGZpcnN0OiB7ICRjb25jYXQ6IFsnJHRhbmtJZCddIH0gfSxcbiAgICAgICAgICB2YWx1ZTogeyAkZmlyc3Q6ICckZmlsbF9yYXRlJyB9LFxuICAgICAgICAgIGxhc3RVcGRhdGU6IHsgJGZpcnN0OiAnJGRhdGUnIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHRhbmtTdGF0dXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1RhbmsgU3RhdHVzIEFQSSBFcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogJ1RhbmsgZHVydW11IHZlcmlsZXJpIGFsxLFuxLFya2VuIGJpciBoYXRhIG9sdcWfdHUnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJjb25uZWN0REIiLCJTYWxlIiwiR0VUIiwicmVxdWVzdCIsInNlYXJjaFBhcmFtcyIsIlVSTCIsInVybCIsInRhbmtJZCIsImdldCIsInN0YXJ0RGF0ZSIsIkRhdGUiLCJlbmREYXRlIiwidGFua0ZpbHRlciIsInRhbmtTdGF0dXMiLCJhZ2dyZWdhdGUiLCIkbWF0Y2giLCJkYXRlIiwiJGd0ZSIsIiRsdGUiLCIkc29ydCIsIiRncm91cCIsIl9pZCIsIm5hbWUiLCIkZmlyc3QiLCIkY29uY2F0IiwidmFsdWUiLCJsYXN0VXBkYXRlIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsInN0YXR1cyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/tank-status/route.ts\n");

/***/ }),

/***/ "(rsc)/./app/lib/db.ts":
/*!***********************!*\
  !*** ./app/lib/db.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst MONGODB_URI = \"mongodb+srv://sevvalmertoglu131:Rvs1KjO1IbX9WVGL@cluster0.7hsg4vx.mongodb.net/dashboard?retryWrites=true&w=majority&appName=Cluster0\";\nif (!MONGODB_URI) {\n    throw new Error('MONGODB_URI is not defined in environment variables');\n}\nlet cached = global.mongoose;\nif (!cached) {\n    cached = global.mongoose = {\n        conn: null,\n        promise: null\n    };\n}\nasync function connectDB() {\n    if (cached.conn) {\n        console.log('MongoDB bağlantısı zaten mevcut');\n        return cached.conn;\n    }\n    if (!cached.promise) {\n        const opts = {\n            bufferCommands: true\n        };\n        console.log('MongoDB bağlantısı başlatılıyor...');\n        cached.promise = mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(MONGODB_URI, opts).then((mongoose)=>{\n            console.log('MongoDB bağlantısı başarılı!');\n            return mongoose;\n        }).catch((error)=>{\n            console.error('MongoDB bağlantı hatası:', error);\n            throw error;\n        });\n    }\n    try {\n        cached.conn = await cached.promise;\n        return cached.conn;\n    } catch (error) {\n        cached.promise = null;\n        throw error;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (connectDB);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbGliL2RiLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFnQztBQUVoQyxNQUFNQyxjQUFjQyxzSUFBdUI7QUFFM0MsSUFBSSxDQUFDRCxhQUFhO0lBQ2hCLE1BQU0sSUFBSUcsTUFBTTtBQUNsQjtBQUVBLElBQUlDLFNBQVMsT0FBZ0JMLFFBQVE7QUFFckMsSUFBSSxDQUFDSyxRQUFRO0lBQ1hBLFNBQVMsT0FBZ0JMLFFBQVEsR0FBRztRQUFFTyxNQUFNO1FBQU1DLFNBQVM7SUFBSztBQUNsRTtBQUVBLGVBQWVDO0lBQ2IsSUFBSUosT0FBT0UsSUFBSSxFQUFFO1FBQ2ZHLFFBQVFDLEdBQUcsQ0FBQztRQUNaLE9BQU9OLE9BQU9FLElBQUk7SUFDcEI7SUFFQSxJQUFJLENBQUNGLE9BQU9HLE9BQU8sRUFBRTtRQUNuQixNQUFNSSxPQUFPO1lBQ1hDLGdCQUFnQjtRQUNsQjtRQUVBSCxRQUFRQyxHQUFHLENBQUM7UUFDWk4sT0FBT0csT0FBTyxHQUFHUix1REFBZ0IsQ0FBQ0MsYUFBY1csTUFBTUcsSUFBSSxDQUFDLENBQUNmO1lBQzFEVSxRQUFRQyxHQUFHLENBQUM7WUFDWixPQUFPWDtRQUNULEdBQUdnQixLQUFLLENBQUMsQ0FBQ0M7WUFDUlAsUUFBUU8sS0FBSyxDQUFDLDRCQUE0QkE7WUFDMUMsTUFBTUE7UUFDUjtJQUNGO0lBRUEsSUFBSTtRQUNGWixPQUFPRSxJQUFJLEdBQUcsTUFBTUYsT0FBT0csT0FBTztRQUNsQyxPQUFPSCxPQUFPRSxJQUFJO0lBQ3BCLEVBQUUsT0FBT1UsT0FBTztRQUNkWixPQUFPRyxPQUFPLEdBQUc7UUFDakIsTUFBTVM7SUFDUjtBQUNGO0FBRUEsaUVBQWVSLFNBQVNBLEVBQUMiLCJzb3VyY2VzIjpbIi9Vc2Vycy9zZXZ2YWxtZXJ0b2dsdS9EZXNrdG9wL2NoYXJ0LWRhc2hib2FyZC9hcHAvbGliL2RiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IE1PTkdPREJfVVJJID0gcHJvY2Vzcy5lbnYuTU9OR09EQl9VUkk7XG5cbmlmICghTU9OR09EQl9VUkkpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdNT05HT0RCX1VSSSBpcyBub3QgZGVmaW5lZCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZXMnKTtcbn1cblxubGV0IGNhY2hlZCA9IChnbG9iYWwgYXMgYW55KS5tb25nb29zZTtcblxuaWYgKCFjYWNoZWQpIHtcbiAgY2FjaGVkID0gKGdsb2JhbCBhcyBhbnkpLm1vbmdvb3NlID0geyBjb25uOiBudWxsLCBwcm9taXNlOiBudWxsIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbm5lY3REQigpIHtcbiAgaWYgKGNhY2hlZC5jb25uKSB7XG4gICAgY29uc29sZS5sb2coJ01vbmdvREIgYmHEn2xhbnTEsXPEsSB6YXRlbiBtZXZjdXQnKTtcbiAgICByZXR1cm4gY2FjaGVkLmNvbm47XG4gIH1cblxuICBpZiAoIWNhY2hlZC5wcm9taXNlKSB7XG4gICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgIGJ1ZmZlckNvbW1hbmRzOiB0cnVlLFxuICAgIH07XG5cbiAgICBjb25zb2xlLmxvZygnTW9uZ29EQiBiYcSfbGFudMSxc8SxIGJhxZ9sYXTEsWzEsXlvci4uLicpO1xuICAgIGNhY2hlZC5wcm9taXNlID0gbW9uZ29vc2UuY29ubmVjdChNT05HT0RCX1VSSSEsIG9wdHMpLnRoZW4oKG1vbmdvb3NlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnTW9uZ29EQiBiYcSfbGFudMSxc8SxIGJhxZ9hcsSxbMSxIScpO1xuICAgICAgcmV0dXJuIG1vbmdvb3NlO1xuICAgIH0pLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcignTW9uZ29EQiBiYcSfbGFudMSxIGhhdGFzxLE6JywgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNhY2hlZC5jb25uID0gYXdhaXQgY2FjaGVkLnByb21pc2U7XG4gICAgcmV0dXJuIGNhY2hlZC5jb25uO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNhY2hlZC5wcm9taXNlID0gbnVsbDtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0REI7ICJdLCJuYW1lcyI6WyJtb25nb29zZSIsIk1PTkdPREJfVVJJIiwicHJvY2VzcyIsImVudiIsIkVycm9yIiwiY2FjaGVkIiwiZ2xvYmFsIiwiY29ubiIsInByb21pc2UiLCJjb25uZWN0REIiLCJjb25zb2xlIiwibG9nIiwib3B0cyIsImJ1ZmZlckNvbW1hbmRzIiwiY29ubmVjdCIsInRoZW4iLCJjYXRjaCIsImVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/lib/db.ts\n");

/***/ }),

/***/ "(rsc)/./app/models/Sale.ts":
/*!****************************!*\
  !*** ./app/models/Sale.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst SaleSchema = new (mongoose__WEBPACK_IMPORTED_MODULE_0___default().Schema)({\n    date: {\n        type: Date,\n        required: true,\n        get: (date)=>date.toISOString().split('T')[0]\n    },\n    sales_amount: {\n        type: Number,\n        required: true\n    },\n    profit: {\n        type: Number,\n        required: true\n    },\n    fuelType: {\n        type: String,\n        enum: [\n            'Diesel',\n            'Ad Blue',\n            'Super E5',\n            'Super E10'\n        ],\n        required: true\n    },\n    tankId: {\n        type: String,\n        required: true\n    },\n    malfunctionCount: {\n        type: Number,\n        default: 0\n    },\n    fill_rate: {\n        type: Number,\n        required: true,\n        min: 0,\n        max: 100\n    }\n}, {\n    timestamps: true,\n    toJSON: {\n        getters: true\n    }\n});\nSaleSchema.index({\n    date: 1\n});\nconst Sale = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().models).Sale || mongoose__WEBPACK_IMPORTED_MODULE_0___default().model('Sale', SaleSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sale);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvbW9kZWxzL1NhbGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWdDO0FBRWhDLE1BQU1DLGFBQWEsSUFBSUQsd0RBQWUsQ0FBQztJQUNyQ0csTUFBTTtRQUNKQyxNQUFNQztRQUNOQyxVQUFVO1FBQ1ZDLEtBQUssQ0FBQ0osT0FBZUEsS0FBS0ssV0FBVyxHQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDdkQ7SUFDQUMsY0FBYztRQUNaTixNQUFNTztRQUNOTCxVQUFVO0lBQ1o7SUFDQU0sUUFBUTtRQUNOUixNQUFNTztRQUNOTCxVQUFVO0lBQ1o7SUFDQU8sVUFBVTtRQUNSVCxNQUFNVTtRQUNOQyxNQUFNO1lBQUM7WUFBVTtZQUFXO1lBQVk7U0FBWTtRQUNwRFQsVUFBVTtJQUNaO0lBQ0FVLFFBQVE7UUFDTlosTUFBTVU7UUFDTlIsVUFBVTtJQUNaO0lBQ0FXLGtCQUFrQjtRQUNoQmIsTUFBTU87UUFDTk8sU0FBUztJQUNYO0lBQ0FDLFdBQVc7UUFDVGYsTUFBTU87UUFDTkwsVUFBVTtRQUNWYyxLQUFLO1FBQ0xDLEtBQUs7SUFDUDtBQUNGLEdBQUc7SUFDREMsWUFBWTtJQUNaQyxRQUFRO1FBQUVDLFNBQVM7SUFBSztBQUMxQjtBQUVBdkIsV0FBV3dCLEtBQUssQ0FBQztJQUFFdEIsTUFBTTtBQUFFO0FBRTNCLE1BQU11QixPQUFPMUIsd0RBQWUsQ0FBQzBCLElBQUksSUFBSTFCLHFEQUFjLENBQUMsUUFBUUM7QUFFNUQsaUVBQWV5QixJQUFJQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvc2V2dmFsbWVydG9nbHUvRGVza3RvcC9jaGFydC1kYXNoYm9hcmQvYXBwL21vZGVscy9TYWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb25nb29zZSBmcm9tICdtb25nb29zZSc7XG5cbmNvbnN0IFNhbGVTY2hlbWEgPSBuZXcgbW9uZ29vc2UuU2NoZW1hKHtcbiAgZGF0ZToge1xuICAgIHR5cGU6IERhdGUsXG4gICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgZ2V0OiAoZGF0ZTogRGF0ZSkgPT4gZGF0ZS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF1cbiAgfSxcbiAgc2FsZXNfYW1vdW50OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG4gIHByb2ZpdDoge1xuICAgIHR5cGU6IE51bWJlcixcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuICBmdWVsVHlwZToge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICBlbnVtOiBbJ0RpZXNlbCcsICdBZCBCbHVlJywgJ1N1cGVyIEU1JywgJ1N1cGVyIEUxMCddLFxuICAgIHJlcXVpcmVkOiB0cnVlXG4gIH0sXG4gIHRhbmtJZDoge1xuICAgIHR5cGU6IFN0cmluZyxcbiAgICByZXF1aXJlZDogdHJ1ZVxuICB9LFxuICBtYWxmdW5jdGlvbkNvdW50OiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgZmlsbF9yYXRlOiB7XG4gICAgdHlwZTogTnVtYmVyLFxuICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgIG1pbjogMCxcbiAgICBtYXg6IDEwMFxuICB9XG59LCB7XG4gIHRpbWVzdGFtcHM6IHRydWUsXG4gIHRvSlNPTjogeyBnZXR0ZXJzOiB0cnVlIH1cbn0pO1xuXG5TYWxlU2NoZW1hLmluZGV4KHsgZGF0ZTogMSB9KTtcblxuY29uc3QgU2FsZSA9IG1vbmdvb3NlLm1vZGVscy5TYWxlIHx8IG1vbmdvb3NlLm1vZGVsKCdTYWxlJywgU2FsZVNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFNhbGU7ICJdLCJuYW1lcyI6WyJtb25nb29zZSIsIlNhbGVTY2hlbWEiLCJTY2hlbWEiLCJkYXRlIiwidHlwZSIsIkRhdGUiLCJyZXF1aXJlZCIsImdldCIsInRvSVNPU3RyaW5nIiwic3BsaXQiLCJzYWxlc19hbW91bnQiLCJOdW1iZXIiLCJwcm9maXQiLCJmdWVsVHlwZSIsIlN0cmluZyIsImVudW0iLCJ0YW5rSWQiLCJtYWxmdW5jdGlvbkNvdW50IiwiZGVmYXVsdCIsImZpbGxfcmF0ZSIsIm1pbiIsIm1heCIsInRpbWVzdGFtcHMiLCJ0b0pTT04iLCJnZXR0ZXJzIiwiaW5kZXgiLCJTYWxlIiwibW9kZWxzIiwibW9kZWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/models/Sale.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftank-status%2Froute&page=%2Fapi%2Ftank-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftank-status%2Froute.ts&appDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftank-status%2Froute&page=%2Fapi%2Ftank-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftank-status%2Froute.ts&appDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sevvalmertoglu_Desktop_chart_dashboard_app_api_tank_status_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/tank-status/route.ts */ \"(rsc)/./app/api/tank-status/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/tank-status/route\",\n        pathname: \"/api/tank-status\",\n        filename: \"route\",\n        bundlePath: \"app/api/tank-status/route\"\n    },\n    resolvedPagePath: \"/Users/sevvalmertoglu/Desktop/chart-dashboard/app/api/tank-status/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sevvalmertoglu_Desktop_chart_dashboard_app_api_tank_status_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZ0YW5rLXN0YXR1cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGdGFuay1zdGF0dXMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZ0YW5rLXN0YXR1cyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNldnZhbG1lcnRvZ2x1JTJGRGVza3RvcCUyRmNoYXJ0LWRhc2hib2FyZCUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzZXZ2YWxtZXJ0b2dsdSUyRkRlc2t0b3AlMkZjaGFydC1kYXNoYm9hcmQmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQzBCO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCIvVXNlcnMvc2V2dmFsbWVydG9nbHUvRGVza3RvcC9jaGFydC1kYXNoYm9hcmQvYXBwL2FwaS90YW5rLXN0YXR1cy9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvdGFuay1zdGF0dXMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS90YW5rLXN0YXR1c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvdGFuay1zdGF0dXMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvc2V2dmFsbWVydG9nbHUvRGVza3RvcC9jaGFydC1kYXNoYm9hcmQvYXBwL2FwaS90YW5rLXN0YXR1cy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftank-status%2Froute&page=%2Fapi%2Ftank-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftank-status%2Froute.ts&appDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Ftank-status%2Froute&page=%2Fapi%2Ftank-status%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Ftank-status%2Froute.ts&appDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsevvalmertoglu%2FDesktop%2Fchart-dashboard&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();