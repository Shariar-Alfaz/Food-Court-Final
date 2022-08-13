<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Customer;
use App\Models\Restaurant;

class Ratings extends Model
{
    protected $table = "ratings";
    protected $primarykey = "id";
    public $timestamps = false;
    public function Customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id','id');
    }
    public function Restaurant()
    {
        return $this->belongsTo(Restaurant::class,'vendor_id','id');
    }

}
