import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Link } from "react-router";

export default function PasswordResetSuccess() {  
    return(
         <Card className="border-purple-100 shadow-lg">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-purple-900 text-center">¡Contraseña Actualizada!</CardTitle>
              <CardDescription className="text-purple-600 text-center">
                Tu contraseña ha sido cambiada exitosamente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/sign" className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 inline-flex items-center justify-center text-white py-2 px-4 rounded">
                Volver al Inicio de Sesión
              </Link>
            </CardContent>
          </Card>

    )
 }