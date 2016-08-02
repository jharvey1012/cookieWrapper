
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
// No direct support for cookies in jQuery :/
// So building a wrapper
 
// http://stackoverflow.com/a/24103596/1015046
var cookieAPI = {
    createCookie: function(name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        } else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
 
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
 
    eraseCookie: function(name) {
        // http://www.sitepoint.com/3-things-about-cookies-you-may-not-know/
        this.createCookie(name, "", -1);
    }
 
};
 
$(document).ready(function() {
 
    var cookieName = 'longForm';
 
    // on blur of any form field, save the form data to cookie
    $('.form-control').on('blur', function() {
        // this can be cleaned up better to save 
        // only the relevant form data
        // I am saving the entire form data for simplicity
 
        cookieAPI.createCookie(cookieName, $('form').serialize(), 7);
 
 
    });
 
 
    // populate existing form data
    var fData = cookieAPI.readCookie(cookieName);
    if (fData) {
        var formFields = fData.split('&');
 
        for (var i = 0; i < formFields.length; i++) {
            var _d = formFields[i].split('=');
            // you can avoid the below vars and directly work with
            // line 102
            var formEle = _d[0];
            var formEleVal = _d[1];
            $('[name=' + formEle + ']').val(formEleVal);
        };
    }
 
    // delete the cookie if the form is "successfully submit"
 
    $('form').submit(function(e) {
        e.preventDefault();
 
        // AJAX Call to server..
 
        // Success
        cookieAPI.eraseCookie(cookieName);
 
    });
 
});
