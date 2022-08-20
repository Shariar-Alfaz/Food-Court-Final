<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerApiController;
use App\Http\Controllers\RegistrationAndLoginApiController;
use App\Http\Controllers\AdminApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//home
Route::post('/home/createCustomer',[RegistrationAndLoginApiController::class,'createCustomer']);
Route::post('/login',[RegistrationAndLoginApiController::class,'login']);
//customer
Route::group(['middleware'=>['apiCustomerAuth']],function(){
    Route::get('/customer/restaurantsData/{id?}',[CustomerApiController::class,'getAllRestaurant']);
    Route::get('/customer/info',[CustomerApiController::class,'getCustomer']);
    Route::get('/customer/restaurantFoodCategory/{id}',[CustomerApiController::class,'getCategory']);
    Route::get('/customer/resturantSearch/{name}',[CustomerApiController::class,'searchRestaurant']);
    Route::get('/customer/food/{id}',[CustomerApiController::class,'getFoodItem']);
    Route::post('/customer/orderPlace',[CustomerApiController::class,'confirmOrder']);
    Route::any("/customer/logout",[CustomerApiController::class,'logout']);
    Route::post("/customer/restaurant/ratings",[CustomerApiController::class,"restaurantRating"]);
    Route::get('/customer/category/{name}/{id}',[CustomerApiController::class,'getCategoryWiseFood']);
    Route::get('/customer/ratings/check/{id}',[CustomerApiController::class,'checkForReview']);
});
Route::group(['middleware'=>['apiAdminAuth']],function(){
    Route::post('/admin/createAdmin',[AdminApiController::class,'createAdmin']);
    Route::get('/admin/approveRestaurant/{id}',[AdminApiController::class,'approveRestaurant']);
    Route::get('/admin/logout',[AdminApiController::class,'logout']);
    Route::get('/admin/status/change/{add}/{status}',[AdminApiController::class,'change']);
    Route::get('/admin/status/change/customer/{cid}/{status}',[AdminApiController::class,'changeCus']);
    Route::get('/admin/getRestaurant/approval',[AdminApiController::class,'getRestaurantApproval']);
    Route::get('/admin/getRestaurants',[AdminApiController::class,'getRestaurants']);
    Route::get('/admin/customers',[AdminApiController::class,'getCustomers']);
    
});