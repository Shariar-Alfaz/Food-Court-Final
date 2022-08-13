<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Customer;
use App\Models\UsersLoginInfo;
use App\Models\Token;
use App\Models\Admin;
use Illuminate\Support\Str;
use Datetime;

class RegistrationAndLoginApiController extends Controller
{
    public function createCustomer(Request $req)
    {
        $validator = Validator::make($req->all(),[
            'name'=> 'required|max:50|regex:/^[a-zA-Z .-]*$/',
            'contact_number'=>'required|max:11|min:11|regex:/^01[0-9]*$/',
            'email'=>'required|email',
            'password'=>'required|min:3|max:50',
            'con_password'=>'same:password',
            'address'=>'required',
            'gender'=>'required'
        ],[
            "name.regex"=>"Only letters, '.' and '-' supported.",
            "contact_number.regex"=>"Only numbers supported."

        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $customer = new Customer();
        $customer->name = $req->name;
        $customer->contact_number = $req->contact_number;
        $customer->email = $req->email;
        $customer->password = md5($req->password);
        $customer->address = $req->address;
        $customer->gender = $req->gender;
        try{
            $customer->save();
            return response()->json(['msg'=>'Registration successfully done.']);
        }catch(\Illuminate\Database\QueryException $ex){
            return response()->json(['err'=>'Email Already exist. Try another email.']);
        }
    }
    public function login(Request $req)
    {
        
        $validator = Validator::make($req->all(),[
            'email'=>'required|email',
            'password'=>'required|min:3|max:50'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }
        $loginData = UsersLoginInfo::where([['email',$req->email],['password',md5($req->password)]])->first();
        try{
            if(isset($loginData->rule) && $loginData->rule == 'customer'){
                $customer=Customer::where('email',$loginData->email)->first();
                if($customer->status==1)
                {
                    $activeToken = Token::where('userid',$customer->id)->where('rule','customer')->where('expired_at',null)->first();
                    if($activeToken){
                        $activeToken->expired_at=new Datetime();
                        $activeToken->save();
                    }
                    $key = Str::random(67);
                    $token = new Token();
                    $token->token_key = $key;
                    $token->userid = $customer->id;
                    $token->rule = "customer";
                    $token->created_at = new Datetime();
                    $token->save();
                    return response()->json(["token"=>$key,"rule"=>"customer"],200);
                }else{
                    return response()->json(["blocked","You are temporary blocked."]);
                }
            }elseif(isset($loginData->rule) && $loginData->rule == 'admin'){
                $admin = Admin::where('email',$loginData->email)->first();
                $activeToken = Token::where('userid',$admin->id)->where('rule','admin')->where('expired_at',null)->first();
                    if($activeToken){
                        $activeToken->expired_at=new Datetime();
                        $activeToken->save();
                    }
                    $key = Str::random(67);
                    $token = new Token();
                    $token->token_key = $key;
                    $token->userid = $admin->id;
                    $token->rule = "admin";
                    $token->created_at = new Datetime();
                    $token->save();
                    return response()->json(["token"=>$key,"rule"=>"admin"],200);
            }
            else{
                return response()->json(['lerr'=>'Email or password not match']);
            }
        }catch(Exception $e){
            return response()->json(['lerr','Email or password not match']);
        }
    }
}
