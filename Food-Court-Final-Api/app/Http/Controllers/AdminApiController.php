<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Admin;
use App\Models\Restaurant;
use App\Models\Token;
use App\Models\Food;
use App\Models\Ratings;
use App\Models\Order;
use App\Models\Customer;
use Datetime;

class AdminApiController extends Controller
{
    public function createAdmin(Request $req)
    {
        $admin = new Admin();
        $admin->name = $req->name;
        $admin->email = $req->email;
        $admin->password = md5($req->password);
        $admin->rule = 'admin';
        try{
            $admin->save();
            return response()->json(['msg'=>'Account created.'],201);
        }catch(\Illuminate\Database\QueryException $ex){
            return response()->json(['err'=>'This email already used.'],422);
        }
        
    }
    public function approveRestaurant(Request $req)
    {
        $res = Restaurant::find($req->id);
        $res->status=1;
        $res->update();
        return response()->json(['appr'=>'Approved']);
    }
    public function logout(Request $req)
    {
        $key = $req->header("Authorization");
        if($key){
            $tk = Token::where("token_key",$key)->first();
            $tk->expired_at = new Datetime();
            $tk->save();
        }
    }
    public function change(Request $req)    
    {
        if($req->status == 1){
            $restaurant =Restaurant::find($req->add);
            $restaurant->status = 2;
            $restaurant->update();
            return response()->json(['msg'=>'Blocked']);
        }elseif($req->status == 2){
            $restaurant =Restaurant::find($req->add);
            $restaurant->status = 1;
            $restaurant->update();
            return response()->json(['msg'=>'Unblocked']);
        }
    }
    public function changeCus(Request $req)    
    {
        if($req->status == 1){
            $restaurant =Customer::find($req->cid);
            $restaurant->status = 0;
            $restaurant->update();
            return response()->json(['msg'=>'Blocked']);
        }elseif($req->status == 0){
            $restaurant =Customer::find($req->cid);
            $restaurant->status = 1;
            $restaurant->update();
            return response()->json(['msg'=>'Unblocked']);
        }
    }
    public function getRestaurantApproval()
    {
        $restaurant = Restaurant::where('status',0)->get();
        return response()->json(['approval'=>$restaurant]);
    }
    public function getRestaurants()
    {
        $restaurant = Restaurant::where('status',"!=",0)->get();
        $restaurants = array();
        foreach($restaurant as $r){
            $sum=0;
            $avg=0;
            $count =count($r->Ratings);
            $food = count($r->Foods);
            $order = count($r->Orders);

            if($count!=0){
                foreach($r->Ratings as $rt){
                    $sum+=$rt->ratings;
                }
            $avg =$sum/$count;
            }
            $obj = new Restaurant();
            $obj->id = $r->id;
            $obj->name = $r->name;
            $obj->email = $r->email;
            $obj->status = $r->status;
            $obj->address = $r->address;
            $obj->contact_number = $r->contact_number;
            $obj->logo = $r->logo;
            $obj->order = $order;
            $obj->food = $food;
            $obj->ratings = $avg;
            array_push($restaurants,$obj);
        }
        return response()->json(['res'=>$restaurants]);
    }
    public function getCustomers()
    {
        $customers= Customer::all();
        $data = array();
        foreach($customers as $c){
            $tOrders = count($c->Orders);
            $cus = new Customer();
            $cus->id=$c->id;
            $cus->name=$c->name;
            $cus->contact_number=$c->contact_number;
            $cus->address=$c->address;
            $cus->email=$c->email;
            $cus->gender=$c->gender;
            $cus->orders=$tOrders;
            $cus->status = $c->status;
            array_push($data,$cus);
        }
        return response()->json(['customers'=>$data]);
    }
    
}