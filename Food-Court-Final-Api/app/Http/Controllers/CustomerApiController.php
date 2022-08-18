<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Restaurant;
use App\Models\Customer;
use App\Models\Food;
use App\Models\Order;
use App\Models\OdersFoodMaping;
use App\Models\Token;
use App\Models\Ratings;
use Datetime;

class CustomerApiController extends Controller
{
    //
    public function getAllRestaurant($id = null)
    {
        if($id){
            $foods=Food::where('vendor_id',$id)->orderby('category')->get();
            $restaurnt = Restaurant::where("id",$id)->where("status",1)->first();
            $ratings = Ratings::where('vendor_id',$id)->orderBy('datetime','ASC')->get();
            $ratedby = array();
            foreach($ratings as $r){
                array_push($ratedby,$r->Customer->name);
            }
            $ratingsTotal=0.00;
            $sum=0;
            $avg =0.00;
            $count=count($ratings);
            if($count!=0){
                foreach($ratings as $r){
                    $sum+=$r->ratings;
                }
                $avg = $sum/$count;
            }
            return response()->json(["restaurant"=>$restaurnt,"foods"=>$foods,"ratings"=>$ratings,"totalRatings"=>$avg]);
        }
        else{
            $restaurants= Restaurant::where('status',1)->get();
            $upRes = array();
            foreach($restaurants as $r){
                $sum=0;
                $avg =0;
                $count=count($r->Ratings);
                    foreach($r->Ratings as $re){
                        $sum+=$re->ratings;
                    }
                    if($count!=0){
                        $avg = $sum/$count;
                    }
                    $res = new Restaurant();
                    $res->name = $r->name;
                    $res->email = $r->email;
                    $res->contact_number = $r->contact_number;
                    $res->logo = $r->logo;
                    $res->address = $r->address;
                    $res->id = $r->id;
                    $res->ratings = $avg;
                    array_push($upRes,$res);
            }
            return response()->json(['restaurants'=>$upRes]);
        }
    }
    public function getCustomer(Request $req)
    {
        $key=$req->header("Authorization");
        $token = Token::where("token_key",$key)->first();
        return Customer::find($token->userid);
    }
    public function getCategory($id)
    {
        return Food::where('vendor_id',$id)->select('category')->distinct()->get();
    }
    public function searchRestaurant($name)
    {
        $res = Restaurant::where('name','like','%'.$name.'%')->where('status',1)->get();
        return response()->json(['res'=>$res]);
    }
    public function getFoodItem($id)
    {
        return Food::find($id);
    }
    public function confirmOrder(Request $req)
    {   
        $token = $req->header("Authorization");
        $customer_id = Token::where("token_key",$token)->select('userid')->first();
        $items = json_decode($req->items);
        $order_id =uniqid();
        $order = new Order();
        $order->customer_id = $customer_id->userid;
        $order->vendor_id = $items[0]->restaurentId;
        $order->delivary_location = $req->address;
        $order->order_id=$order_id;
        $order->customer_number = $req->phone;
        $order->save();
        $oid = Order::select('id')->where('order_id',$order_id)->first();
        foreach($items as $i){
            $ofm = new OrdersFoodMaping();
            $ofm->food_id = $i->foodId;
            $ofm->order_id = $oid->id;
            $ofm->instruction = $i->orderDes;
            $ofm->subtotal = $i->subtotal;
            $ofm->quantity = $i->foodQuantity;
            $ofm->save();
        }
        return response()->json("Order placed.");
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
    public function restaurantRating(Request $req)
    {
        $validator = Validator::make($req->all(),[
            'comment'=>'regex:/^[a-zA-Z0-9 .,%"-]*$/',
            'ratings'=>'required'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $key = $req->header('Authorization');
        $customer = Token::where('token_key',$key)->select('userid')->first();
        $ratings = new Ratings();
        $ratings->vendor_id = $req->vendor_id;
        $ratings->customer_id = $customer->userid;
        $ratings->ratings =$req->ratings;
        $ratings->comment = $req->comment;
        $ratings->datetime = new Datetime();
        $ratings->save();
        return response()->json(['msg'=>'Your rating added.']);
    }
}
