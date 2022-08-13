<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Token;

class ApiCustomerAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->header("Authorization");
        if($token){
            $key = Token::where('token_key',$token)
                        ->whereNull('expired_at')->first();

            if($key){
                if( $key->rule == 'customer' && $key->userid != null)
                    return $next($request);
            }
            return response()->json(["msg"=>"Supplied Token is invalid or expired"],401);
        }
        return response()->json(["msg"=>"No token supplied"],401);
    }
}
