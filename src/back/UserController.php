<?php
require 'repositories.php';

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization");

$ctxt = new DataBase();
if(isset($_GET['Key']))
{
    
    switch ($_GET['Key']) {
        case 'get-cars':
            echo json_encode($ctxt->getCars());
            break;
        case 'get-ip':
            $ip =  $_SERVER['REMOTE_ADDR'];
            echo json_encode($ip);
            break;
        case 'get-same-cars':
            echo json_encode($ctxt->getSameCars($_GET['Id']));
            break;
        case 'get-reports':
            echo json_encode($ctxt->getReports());
            break;
        case 'get-report-cars':
            echo json_encode($ctxt->getReportCar(-1));
        case 'get-users':
            echo json_encode($ctxt->getReportUser(-1));
            break;
        case 'get-user':
            echo json_encode($ctxt->getUser($_GET['Email'], $_GET['Password']));
            break;
        case 'add-user':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->addUser($b['Name'], $b['Email'], $b['Password'], $b['Phone'], $b['Lang']));
            break;
        case 'change-info':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->changeInfo($_GET['Token'], $b['Type'], $b['Value'], $b['UserId']));
            break;
        case 'set-admin':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->setAdmin($_GET['Token'], $_GET['Id'], $_GET['IsAdmin']));
            break;
        case 'delete-user':
            $b = json_decode(file_get_contents('php://input'), true);
            echo json_encode($ctxt->deleteUser($_GET['Token'], $_GET['Id']));
            break;
        default:
            echo "Введенный ключ несуществует";
        
    }
    
}
else
{  
    echo "Введенные данные некорректны";
}
?>