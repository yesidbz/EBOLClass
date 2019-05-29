<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Model\User;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Validator, DB, Hash, Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Mail\Message;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $credentials = $request->only('name', 'email', 'password','rol');
        
        $rules = [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users'
        ];
        $validator = Validator::make($credentials, $rules);

        if($validator->fails()) {
            return response()->json(['ok'=> false, 'error'=> $validator->messages()]);
        }

        $name = $request->name;
        $email = $request->email;
        $password = $request->password;
        $rol = $request->rol;
        
        $user = User::create(['name' => $name, 'email' => $email, 'password' => Hash::make($password), 'rol' => $rol ]);
        
        $verification_code = str_random(30); //Generate verification code
        
        DB::table('user_verifications')->insert(['user_id'=>$user->id,'token'=>$verification_code]);
        
        $subject = "Verificar el registro";
        
        Mail::send('email.verify', compact('name', 'verification_code'),
            function($mail) use ($email, $name, $subject){
                $mail->from(getenv('FROM_EMAIL_ADDRESS'), "SENA");
                $mail->to($email, $name);
                $mail->subject($subject);
            });

        return response()->json(['ok'=> true, 'message'=> 'Thanks for signing up! Please check your email to complete your registration.']);
    }

    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();
        
        if(!is_null($check)){
            $user = User::find($check->user_id);
            if($user->is_verified == 1){
                return response()->json([
                    'ok'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();

            return view("verificar", [
                'ok'=> true,
                'message'=> 'You have okfully verified your email address.'
            ]);
        }
        return view("verificar", ['ok'=> false, 'message'=> "Verification code is invalid."]);
    }


    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];
        $validator = Validator::make($credentials, $rules);
        if($validator->fails()) {
            return response()->json(['ok'=> false, 'error'=> $validator->messages()], 401);
        }
        
        $credentials['is_verified'] = 1;
        

/*
       $email = $request->input('email');

        $vali = (int) User  :: select('id')
        ->where('email','=',$email)
        ->groupBy('email')
        //->havingRaw('SUM(porcentaje) < ?',100)
        ->sum('estado');
        

       var_dump($vali);

       */


       $estado = User::select("estado")
       ->first();

       $email = $request->input('email');
      
       $rol = User::select("rol")
       ->where('email','=',$email )
       ->first();

       
        
        try {

            
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['ok' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 404);
            }


            if (strpos($estado,'0') !== false ){
                return response()->json(['ok' => false, 'error' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 404);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['ok' => false, 'error' => 'Failed to login, please try again.'], 500);
        }

        //$token = auth()->setTTL(7200)->attempt($credentials);
        // all good so return the token

        
      
        return response()->json(['ok' => true, 
        'token' => $token,
        'rol' => $rol ]
        , 200);

    

    }
    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request) {
        $this->validate($request, ['token' => 'required']);
        
        try {
            JWTAuth::invalidate($request->input('token'));
            return response()->json(['ok' => true, 'message'=> "You have okfully logged out."]);
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['ok' => false, 'error' => 'Failed to logout, please try again.'], 500);
        }
    }

public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['ok' => false, 'error' => ['email'=> $error_message]], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['ok' => false, 'error' => $error_message], 401);
        }
        return response()->json([
            'ok' => true, 'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }

    public function getUserByEmail(Request $request){
        $user = User::where('email', $request->email)->first();
        return response()->json([
            'ok'=>true,
            "user"=>$user
        ]);
    }

    public function reset (Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'newpassword' => 'required|max:45',
            'confirmPassword' => 'required|same:newpassword',
            ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->messages(),
            ]);
        }
        $User = $request->User;
        $newpassword = $request->newpassword;
        $usuario = User::select("users.id")
        ->where("users.email", $User)
        ->first();

        try {
            $userpwd = User::find($usuario->id);

            if ($userpwd == false) {
                return response()->json([
                    'success'=> false,
                    'error'=> "Usuario no encontrado."
                ]);
            }

            $userpwd -> update(['password' => Hash::make($newpassword)]);
            return response()->json([
                'success'=> true,
                'mensaje'=> "Actualización de contraseña exitosa."
            ]);
        } catch (\Exception $ex) {
            return response()->json([
                'success'=> false,
                'error'=> $ex->getMessage()
            ]);
        }
    }
}
