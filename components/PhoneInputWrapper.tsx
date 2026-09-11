'use client';

import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

export default function PhoneInputWrapper() {
  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState('91');
  const [countryIso, setCountryIso] = useState('in');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`w-full relative flex items-center bg-white border border-[#194F97] transition-all duration-200 ${
        isFocused ? 'outline outline-1 outline-[#194F97] outline-offset-0' : ''
      }`}
      style={{ height: '44px' }}
    >
      <PhoneInput
        key={countryIso}
        country={countryIso}
        value={phone}
        onChange={(val, country: any) => {
          if (country && country.countryCode) {
            if (country.countryCode !== countryIso) {
              // Country was changed via dropdown. 
              // Force a complete remount by updating the key and countryIso, and wipe the phone number.
              setCountryIso(country.countryCode);
              setDialCode(country.dialCode);
              setPhone('');
              return;
            }
          }
          // Normal typing
          setPhone(val);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        enableSearch={true}
        disableSearchIcon={true}
        disableCountryCode={true}
        searchPlaceholder="Search country..."
        isValid={(value, country: any) => {
          if (!value) return true;
          try {
            return isValidPhoneNumber('+' + country.dialCode + value) ? true : false;
          } catch (e) {
            return false;
          }
        }}
        inputProps={{
          name: 'contact_number_local',
          id: 'contact_number_local',
          required: true,
          'aria-describedby': 'contact_number_error',
        }}
        containerStyle={{ width: '100%', border: 'none', position: 'static' }}
        inputStyle={{
          width: '100%',
          height: '42px',
          border: 'none',
          background: 'transparent',
          paddingLeft: '110px',
          fontSize: '14px',
          color: '#111827',
          outline: 'none',
          boxShadow: 'none'
        }}
        buttonStyle={{
          width: '50px',
          border: 'none',
          background: 'transparent',
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0'
        }}
        dropdownStyle={{
          width: '320px',
          top: '45px'
        }}
      />
      
      {/* Premium Dial Code Overlay */}
      <div className="absolute left-[50px] top-[50%] -translate-y-[50%] flex items-center pointer-events-none z-10">
        <span className="text-[14px] text-gray-700 font-inter font-medium mr-2 tracking-wide">
          +{dialCode}
        </span>
        <div className="h-5 w-[1px] bg-gray-300"></div>
      </div>

      {/* Hidden input to submit the full international number for the backend */}
      <input type="hidden" name="contact_number" value={phone ? '+' + dialCode + phone : ''} />
    </div>
  );
}
