{{-- resources/views/emails/ams-registration.blade.php --}}
<h2>New AMS Registration</h2>

<h3>Contract</h3>
<p><strong>Contract Duration:</strong> {{ $formData['contract_duration'] }}</p>

<h3>Customer Information</h3>
<p><strong>Company Name:</strong> {{ $formData['company_name'] }}</p>
<p><strong>Contact Person:</strong> {{ $formData['contact_person'] }}</p>
<p><strong>Position:</strong> {{ $formData['position'] }}</p>
<p><strong>Phone Number:</strong> {{ $formData['phone_number'] }}</p>
<p><strong>Email Address:</strong> {{ $formData['email_address'] }}</p>
<p><strong>Office Address:</strong> {{ $formData['office_address'] }}</p>

<h3>Service Location</h3>
<p><strong>Site Name:</strong> {{ $formData['site_name'] }}</p>
<p><strong>Site Address:</strong> {{ $formData['site_address'] }}</p>
<p><strong>Operating Hours:</strong> {{ $formData['operating_hours'] }}</p>

<h3>Service Package</h3>
<p><strong>Package:</strong> {{ $formData['service_package'] }}</p>