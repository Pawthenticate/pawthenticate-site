'use client';

import Script from 'next/script';

const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700;800&display=swap');
@import url("https://assets.mlcdn.com/fonts.css?version=1762785");

        /* LOADER */
        .ml-form-embedSubmitLoad {
          display: inline-block;
          width: 20px;
          height: 20px;
        }

        .g-recaptcha {
          transform: scale(1);
          -webkit-transform: scale(1);
          transform-origin: 0 0;
          -webkit-transform-origin: 0 0;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }

        .ml-form-embedSubmitLoad:after {
          content: " ";
          display: block;
          width: 11px;
          height: 11px;
          margin: 1px;
          border-radius: 50%;
          border: 4px solid #fff;
          border-color: #ffffff #ffffff #ffffff transparent;
          animation: ml-form-embedSubmitLoad 1.2s linear infinite;
        }

        @keyframes ml-form-embedSubmitLoad {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        #mlb2-33378216.ml-form-embedContainer {
          box-sizing: border-box;
          display: table;
          margin: 0 auto;
          position: static;
          width: 100% !important;
        }

        #mlb2-33378216.ml-form-embedContainer h4,
        #mlb2-33378216.ml-form-embedContainer p,
        #mlb2-33378216.ml-form-embedContainer span,
        #mlb2-33378216.ml-form-embedContainer button {
          text-transform: none !important;
          letter-spacing: normal !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper {
          background-color: #FFF5E6;
          border-width: 0px;
          border-color: transparent;
          border-radius: 40px;
          border-style: solid;
          box-sizing: border-box;
          display: inline-block !important;
          margin: 0;
          padding: 0;
          position: relative;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { 
          width: 700px; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper.embedForm { 
          max-width: 700px; 
          width: 100%; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-align-left { 
          text-align: left; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-align-center { 
          text-align: center; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-align-default { 
          display: table-cell !important; 
          vertical-align: middle !important; 
          text-align: center !important; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-align-right { 
          text-align: right; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img {
          border-top-left-radius: 40px;
          border-top-right-radius: 40px;
          height: auto;
          margin: 0 auto !important;
          max-width: 100%;
          width: undefinedpx;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
          padding: 20px 20px 0 20px;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
          padding-bottom: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
          text-align: left;
          margin: 0 0 20px 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
          color: #1F2937;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 32px;
          font-weight: 700;
          margin: 0 0 10px 0;
          text-align: center;
          word-break: break-word;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
          color: #4B5563;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          margin: 0 0 10px 0;
          text-align: center;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ul,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ul,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol {
          color: #4B5563;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 16px;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol ol,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol ol {
          list-style-type: lower-alpha;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol ol ol,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol ol ol {
          list-style-type: lower-roman;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p a,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p a {
          color: #4B5563;
          text-decoration: underline;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
          text-align: left!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
          margin-bottom: 5px;
          color: #4B5563;
          font-size: 12px;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-weight: normal; 
          font-style: normal; 
          text-decoration: none;
          display: inline-block;
          line-height: 18px;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child {
          margin: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
          margin: 0;
          width: 100%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
          margin: 0 0 20px 0;
          width: 100%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
          float: left;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
          margin: 0;
          padding: 0 0 20px 0;
          width: 100%;
          height: auto;
          float: left;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
          margin: 0 0 10px 0;
          width: 100%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
          margin: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-formfieldHorizintal {
          margin: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
          background-color: #ffffff !important;
          color: #1F2937 !important;
          border-color: #FFE0C0;
          border-radius: 25px !important;
          border-style: solid !important;
          border-width: 1px !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          height: auto;
          line-height: 21px !important;
          margin-bottom: 0;
          margin-top: 0;
          margin-left: 0;
          margin-right: 0;
          padding: 10px 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-webkit-input-placeholder,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-webkit-input-placeholder { 
          color: #1F2937; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-moz-placeholder,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-moz-placeholder { 
          color: #1F2937; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-ms-input-placeholder,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-ms-input-placeholder { 
          color: #1F2937; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-moz-placeholder,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-moz-placeholder { 
          color: #1F2937; 
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow textarea {
          background-color: #ffffff !important;
          color: #1F2937 !important;
          border-color: #FFE0C0;
          border-radius: 25px !important;
          border-style: solid !important;
          border-width: 1px !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          height: auto;
          line-height: 21px !important;
          margin-bottom: 0;
          margin-top: 0;
          padding: 10px 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          border-color: #FFE0C0!important;
          background-color: #ffffff!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.custom-control-input[type="checkbox"]{
          box-sizing: border-box;
          padding: 0;
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin-top: 5px;
          margin-left: -1.5rem;
          overflow: visible;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          border-radius: 4px!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e");
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-input:checked~.custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::before  {
          border-color: #FFE0C0!important;
          background-color: #FF6B6B!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::after {
          top: 2px;
          box-sizing: border-box;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          top: 0px!important;
          box-sizing: border-box!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          top: 0px!important;
          box-sizing: border-box!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::after {
          top: 0px!important;
          box-sizing: border-box!important;
          position: absolute;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before {
          top: 0px!important;
          box-sizing: border-box!important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-control-label::before {
          position: absolute;
          top: 4px;
          left: -1.5rem;
          display: block;
          width: 16px;
          height: 16px;
          pointer-events: none;
          content: "";
          background-color: #ffffff;
          border: #adb5bd solid 1px;
          border-radius: 50%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-control-label::after {
          position: absolute;
          top: 2px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          position: absolute;
          top: 4px;
          left: -1.5rem;
          display: block;
          width: 16px;
          height: 16px;
          pointer-events: none;
          content: "";
          background-color: #ffffff;
          border: #adb5bd solid 1px;
          border-radius: 50%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after {
          position: absolute;
          top: 0px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          position: absolute;
          top: 0px!important;
          left: -1.5rem;
          display: block;
          width: 1rem;
          height: 1rem;
          content: "";
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-radio .custom-control-label::after {
          background: no-repeat 50%/50% 50%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .custom-checkbox .custom-control-label::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::after, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::after {
          background: no-repeat 50%/50% 50%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-control, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-control {
          position: relative;
          display: block;
          min-height: 1.5rem;
          padding-left: 1.5rem;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-input, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input {
          position: absolute;
          z-index: -1;
          opacity: 0;
          box-sizing: border-box;
          padding: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label {
          color: #4B5563;
          font-size: 12px!important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          line-height: 22px;
          margin-bottom: 0;
          position: relative;
          vertical-align: top;
          font-style: normal;
          font-weight: 400;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-select, 
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-select {
          background-color: #ffffff !important;
          color: #1F2937 !important;
          border-color: #FFE0C0;
          border-radius: 25px !important;
          border-style: solid !important;
          border-width: 1px !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          line-height: 20px !important;
          margin-bottom: 0;
          margin-top: 0;
          padding: 10px 28px 10px 12px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
          height: auto;
          display: inline-block;
          vertical-align: middle;
          background: url('https://assets.mlcdn.com/ml/images/default/dropdown.svg') no-repeat right .75rem center/8px 10px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow {
          height: auto;
          width: 100%;
          float: left;
        }

        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { 
          width: 70%; 
          float: left; 
        }

        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { 
          width: 30%; 
          float: left; 
        }

        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn { 
          padding-top: 23px;  
        }

        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields { 
          box-sizing: border-box; 
          float: left; 
          padding-right: 10px;  
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
          background-color: #ffffff;
          color: #1F2937;
          border-color: #FFE0C0;
          border-radius: 25px;
          border-style: solid;
          border-width: 1px;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 0;
          margin-top: 0;
          padding: 10px 10px;
          width: 100%;
          box-sizing: border-box;
          overflow-y: initial;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
          background-color: #FFB347 !important;
          border-color: #FFB347;
          border-style: solid;
          border-width: 1px;
          border-radius: 25px;
          box-shadow: none;
          color: #ffffff !important;
          cursor: pointer;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          font-weight: 700;
          line-height: 20px;
          margin: 0 !important;
          padding: 10px !important;
          width: 100%;
          height: auto;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
          background-color: #FF6B6B !important;
          border-color: #FF6B6B !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type="checkbox"] {
          box-sizing: border-box;
          padding: 0;
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin-top: 5px;
          margin-left: -1.5rem;
          overflow: visible;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description {
          color: #000000;
          display: block;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 12px;
          text-align: left;
          margin-bottom: 0;
          position: relative;
          vertical-align: top;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label {
          font-weight: normal;
          margin: 0;
          padding: 0;
          position: relative;
          display: block;
          min-height: 24px;
          padding-left: 24px;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label a {
          color: #000000;
          text-decoration: underline;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p {
          color: #000000 !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
          font-size: 12px !important;
          font-weight: normal !important;
          line-height: 18px !important;
          padding: 0 !important;
          margin: 0 5px 0 0 !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p:last-child {
          margin: 0;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
          margin: 0 0 20px 0;
          float: left;
          width: 100%;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
          background-color: #FFB347 !important;
          border: none !important;
          border-radius: 25px !important;
          box-shadow: none !important;
          color: #ffffff !important;
          cursor: pointer;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          line-height: 21px !important;
          height: auto;
          padding: 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
          display: none;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
          background-color: #FF6B6B !important;
        }

        .ml-subscribe-close {
          width: 30px;
          height: 30px;
          background: url('https://assets.mlcdn.com/ml/images/default/modal_close.png') no-repeat;
          background-size: 30px;
          cursor: pointer;
          margin-top: -10px;
          margin-right: -10px;
          position: absolute;
          top: 0;
          right: 0;
        }

        .ml-error input, 
        .ml-error textarea, 
        .ml-error select {
          border-color: red!important;
        }

        .ml-error .custom-checkbox-radio-list {
          border: 1px solid red !important;
          border-radius: 40px;
          padding: 10px;
        }

        .ml-error .label-description,
        .ml-error .label-description p,
        .ml-error .label-description p a,
        .ml-error label:first-child {
          color: #ff0000 !important;
        }

        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p,
        #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p:first-letter {
          color: #ff0000 !important;
        }

        @media only screen and (max-width: 700px){
          .ml-form-embedWrapper.embedDefault, 
          .ml-form-embedWrapper.embedPopup { 
            width: 100%!important; 
          }

          .ml-form-formContent.horozintalForm { 
            float: left!important; 
          }

          .ml-form-formContent.horozintalForm .ml-form-horizontalRow { 
            height: auto!important; 
            width: 100%!important; 
            float: left!important; 
          }

          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { 
            width: 100%!important; 
          }

          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { 
            padding-right: 0px!important; 
            padding-bottom: 10px; 
          }

          .ml-form-formContent.horozintalForm .ml-button-horizontal { 
            width: 100%!important; 
          }

          .ml-form-formContent.horozintalForm .ml-button-horizontal.labelsOn { 
            padding-top: 0px!important; 
          }
        }

        .ml-mobileButton-horizontal { 
          display: none; 
        }

        #mlb2-33378216 .ml-mobileButton-horizontal button {
          background-color: #FFB347 !important;
          border-color: #FFB347 !important;
          border-style: solid !important;
          border-width: 1px !important;
          border-radius: 25px !important;
          box-shadow: none !important;
          color: #ffffff !important;
          cursor: pointer;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          line-height: 20px !important;
          padding: 10px !important;
          width: 100% !important;
        }

        @media only screen and (max-width: 700px) {
          #mlb2-33378216.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
            padding: 0 0 10px 0 !important;
          }

          .ml-hide-horizontal { 
            display: none !important; 
          }

          .ml-form-formContent.horozintalForm .ml-button-horizontal { 
            display: none!important; 
          }

          .ml-mobileButton-horizontal { 
            display: inline-block !important; 
            margin-bottom: 20px;
            width:100%; 
          }

          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { 
            padding-bottom: 0px !important; 
          }
        }

        @media only screen and (max-width: 700px) {
          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields {
            margin-bottom: 10px !important;
            width: 100% !important;
          }
        }
      `}</style >

      <div id="mlb2-33378216" className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-33378216">
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyHorizontal row-form">
              <div className="ml-form-embedContent" style={{}}>
                <h4>🐾 Get Early Access!</h4>
                <p>Be the first to know when Pawthenticate launches. Join our waitlist!</p>
              </div>

              <form 
                className="ml-block-form" 
                action="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/subscribe" 
                data-code="" 
                method="post" 
                target="_blank"
              >
                <div className="ml-form-formContent horozintalForm">
                  <div className="ml-form-horizontalRow">
                    <div className="ml-input-horizontal">
                      <div style={{width: '100%'}} className="horizontal-fields">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <input 
                            type="email" 
                            className="form-control" 
                            data-inputmask="" 
                            name="fields[email]" 
                            placeholder="Email address" 
                            autoComplete="email"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="ml-button-horizontal primary">
                      <button type="submit" className="primary">Notify Me! 🚀</button>
                      <button disabled style={{display: 'none'}} type="button" className="loading">
                        <div className="ml-form-embedSubmitLoad"></div>
                        <span className="sr-only">Loading...</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="ml-form-checkboxRow ml-validate-required">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <div className="label-description">
                      <p>I agree to receive occasional email updates about Pawthenticate. No spam, ever. 🐾</p>
                    </div>
                  </label>
                </div>

                <input type="hidden" name="ml-submit" value="1" />

                <div className="ml-mobileButton-horizontal">
                  <button type="submit" className="primary">Notify Me! 🚀</button>
                  <button disabled style={{display: 'none'}} type="button" className="loading">
                    <div className="ml-form-embedSubmitLoad"></div>
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            <div className="ml-form-successBody row-success" style={{display: 'none'}}>
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined our subscriber list.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Script 
        src="https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024" 
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined') {
            (window as any).ml_webform_success_33378216 = function() {
              const $ = (window as any).ml_jQuery || (window as any).jQuery;
              if ($) {
                $('.ml-subscribe-form-33378216 .row-success').show();
                $('.ml-subscribe-form-33378216 .row-form').hide();
              }
            };
          }
        }}
      />

      <Script 
        src="https://assets.mailerlite.com/jsonp/1921432/forms/171107786706388110/takel" 
        strategy="afterInteractive"
      />
    </>
  );
}
