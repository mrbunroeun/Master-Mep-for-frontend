<?php

namespace App\Http\Controllers;

use App\Mail\AmsRegistrationMail;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class AmsRegistrationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'contract_duration' => 'required|string',
            'company_name'      => 'required|string',
            'contact_person'    => 'required|string',
            'position'          => 'required|string',
            'phone_number'      => 'required|string',
            'email_address'     => 'required|email',
            'office_address'    => 'required|string',
            'site_name'         => 'required|string',
            'site_address'      => 'required|string',
            'operating_hours'   => 'required|string',
            'service_package'   => 'required|string',
        ]);

        // Optional: save to DB here first
        // AmsRegistration::create($validated);

        Mail::to('bunroeunhas@gmail.com')->send(new AmsRegistrationMail($validated));

        return redirect()->back();
    }
}