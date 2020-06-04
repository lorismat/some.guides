**Introduction**  
This guide aims at providing every elements to set up a NAS *on your local network* with a raspberry.  
t will be set up without any monitor/external keyboard/mouse.  

**Helper Links**:  
- [Set up your raspberry without monitor/mouse/keyboard](https://howchoo.com/g/mzgzy2mwowj/how-to-set-up-raspberry-pi-without-keyboard-monitor-mouse)
- [Create a NAS from your raspberry, french article](https://raspberry-pi.fr/raspberry-pi-nas-samba/)  

# What you need

## Hardware

- a raspberry
- a raspberry power supply (make sure the power supply fits with the right power, first thing to check if it does not start later on)
- an sd card (and sd card adaptor to flash your image)
- a personal PC
- wifi connection (alternatively, an ethernet cable making the set up even easier)

## Software

- a **Raspbian** image (to be downloaded, [from the official Raspbian website](https://www.raspberrypi.org/downloads/raspberry-pi-os/))
- a mounter (to be downloaded, [from the official Raspbian website](https://www.raspberrypi.org/downloads/)) 
- at some point, you might want to do a network scan (not necessary), `nmap` from the command line is one among other solutions. You can also do it visually with a nice tool to scan network called [AngryIP](https://angryip.org) 

# Steps

## Access the PI on the network, set up your connection

### Core configuration

- insert your sd card to your laptop to burn it. Make sure you won't need the data in it, everything will be deleted!
- open up the mounter software and flash your card (you will select your OS first -the Raspbian image, and your sd card). The official Raspbian mounter made it super easy to flash your card!
- Once done, leave the SD card in the computer. Some set up is required to ssh the Raspberry
- Access your sd card boot directory from your laptop (on Ubuntu, `cd /media/your_media_name/boot` - on MacOS `cd /Volumes/your_media_name/boot`) 
- Set up ssh by default by creating an empty ssh file: `touch ssh` in the `boot` directory
- make up wifi available on boot: you have to create a file: `wpa_supplicant.conf` in the `boot` directory and paste the following:
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="YOUR_NETWORK_NAME"
    psk="YOUR_PASSWORD"
    key_mgmt=WPA-PSK
}
```  
Of course, you will need to replace the ssid & password
- Time to check your setup: you can now insert the card into your Pi and boot it 
- At this point, you want to locate your raspberry on the network. There are several options. 
	- You can try to ping your raspberry: try `ping raspberrypi.local`. It might give you the IP address already. If not, you can try `ping raspberrypi` and `ping raspi`. 
	- Still not working? You can run a network scan and try to get the raspberry hostname. From the command line with `nmap` (need to be installed) or visually with [AngryIP](https://angryip.org). If you try with nmap , run the following: `sudo nmap -sP 192.168.0.0/24`. What it does: it scans all 255 IP adresses on 192.168.0. which is where your local network is set. Still no? Try with another IP range: `192.168.1.0/24`. `sudo` will give you additional info (sometimes the hostname) which makes it easy to identify your devices.  
- Once you found its ip, you are ready to ssh the raspberry: `ssh pi@the_ip_adress_of_your_pi`. The default password is `raspberry`. You are now on your raspberry! 
- Let's set up a new password: run `passwd` and update it!
- To exit the ssh connection, you can run `logout` and you will be back to your laptop

### Optional config

You might find it a bit annoying to retype your ssh command and your password everytime you access your pi. We can configure the connection so that you won't be prompt to do it anymore. The condition is to have an ssh key set already. If not, [here is a good guide](http://rabexc.org/posts/using-ssh-agent) to drive you through!   
- Copy/Paste your laptop public key to the raspberry. Use the following command `ssh-copy-id pi@192.168.0.31` and replace the IP address accordingly. You will be prompt to enter your password. From now on, you should be able to log in without having to type your password!  
To go further: add it as an `alias` and you are all set! 
 
## Set up your NAS

