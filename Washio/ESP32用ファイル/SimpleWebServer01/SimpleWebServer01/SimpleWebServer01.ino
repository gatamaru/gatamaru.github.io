#include "SimpleWebServer.h"

#define LED 13// GPIO13にLEDを接続。

//参考サイト http://okiraku-camera.tokyo/blog/?p=6008

SimpleWebServer server("ESP32DevkitC", "password", IPAddress(192, 168, 4, 1), IPAddress(255, 255, 255, 0), 80);
void led_menu() {
  const char* cur = digitalRead(LED) ? "ON" : "OFF";
  String s =        "HTTP/1.1 200 OK\r\nContent-type:text/html\r\n\r\n"
                    "<HTML>"
                    "<BODY style=\"background-color:#00afcc\">"
                    "<h4 style = \"display: inline-block;font-size:40px;text-align: center; width: 835px;padding: 0.5em 1em; text-decoration: none; color: #FFF;border: double 4px #FFF;border-radius: 3px;transition: .4s;\">"
                    "WiFi-Control-System for ESP32DevkitC"
                    " </h4 > "
                    "<br>"
                    "<table style = \"display: inline-block;font-size:40px;width: 800px;padding: 0.5em 1em;text-decoration: none;color: #FFF;border: solid 2px #00afcc;border-radius: 3px;transition: .4s;\">"
                    "<tr>"
                    "<td>SSID</td>"
                    "<td>...</td>"
                    "<td>ESP32DevkitC</td>"
                    "<tr>"
                    "<td>PassWord</td>"
                    "<td>...</td>"
                    "<td>password</td>"
                    "</tr>"
                    "<tr>"
                    "<td>IPAddress</td>"
                    "<td>...</td>"
                    "<td>192.168.4.1</td>"
                    "</tr>"
                    "<tr>"
                    "<td>SubnetMask</td>"
                    "<td>...</td>"
                    "<td>255.255.255.0</td>"
                    "</tr>"
                    "<tr>"
                    "<td>Status</td>"
                    "<td>...</td>"
                    "<td>";
                    s = s + String(cur) +
                    "</td>"
                    "</tr>"
                    "</table>"
                    
                    "<br>"
                    "<br>"
                    "<br>"
                    "<br>"
                    "<br>"

                    "<a id=\"LEDOFF\" style=\"font-size:40px;display: inline-block;text-decoration: none;background: #00afcc;color: #FFF;width: 250px;height: 250px;line-height: 250px;border-radius: 50%;text-align: center;vertical-align: middle;overflow: hidden;box-shadow: 0px 0px 0px 5px ##00afcc;border: dashed 3px #FFF;transition: .4s;left:130px;position: absolute\">OFF</a>"
                    "<a id=\"LEDON\" style=\"font-size:40px;display: inline-block;text-decoration: none;background: #00afcc;color: #FFF;width: 250px;height: 250px;line-height: 250px;border-radius: 50%;text-align: center;vertical-align: middle;overflow: hidden;box-shadow: 0px 0px 0px 5px ##00afcc;border: dashed 3px #FFF;transition: .4s;left:530px;position: absolute\">ON</a><br/>"
                    "<script>"
                    "function action(){"
                    "location.href = \"/ledon\";"
                    "};"
                    "function antiaction(){"
                    "location.href = \"/ledoff\";"
                    "};"
                    "document.getElementById('LEDON').onmousedown = action;"
                    "document.getElementById('LEDOFF').onmousedown = antiaction;"
                    "</script>"
                    "</BODY>"
                    "</HTML>";
                    server.send_response(s.c_str());
}

void led_on()
{
  digitalWrite(LED, 1);
  led_menu();
}

void led_off()
{
  digitalWrite(LED, 0);
  led_menu();
}

void led_500()
{
  server.send_status(500, "Internal Server Error");
}

void default_handler(String request_line)
{
  Serial.println("default_handler : " + request_line);
  String s = request_line + " is not found";
  server.send_status(404, s.c_str());
}

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println("");
  pinMode(LED, OUTPUT);
  digitalWrite(LED, 0);

  server.add_handler("/", led_menu);
  server.add_handler("/ledon", led_on);
  server.add_handler("/ledoff", led_off);
  server.add_handler("/led500", led_500);

  server.add_default_handler(default_handler);
  server.begin();
}

void loop() {
  server.handle_request();
  delay(10);
}
