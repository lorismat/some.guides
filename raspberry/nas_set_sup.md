**Introduction**  
This guide aims at providing every elements to set up a NAS *on your local network* with a raspberry.  
It will be set up without any monitor/external keyboard/mouse.  

**Helper Links**:  
- [Set up your raspberry without monitor/mouse/keyboard](https://howchoo.com/g/mzgzyhow-to-set-up-raspberry-pi-without-keyboard-monitor-mouse)  
- [Create a NAS from your raspberry](https://howtoraspberrypi.com/create-a-nas-with-your-raspberry-pi-and-samba/)  

**But wait...** What is it exactly?  

A **NAS** stands for _Network-attached storage_ and (...wikipedia...) is a file-level computer data storage server connected to a computer network. Meaning, well... I can add external storage with files to my raspberry. My raspberry itself is hosting the server (which we have to set up) and make it accessible to the network, being my local network. I will be able to connect all my devices to the server and access my files! Depending on my device and setup, I can also write to the server (add/remove files on the server). 

# What you need

## Hardware

- **a raspberry**
- **a raspberry power supply** - most problems if your raspberry does not start come from the power supply and depending on your model, you might pay attention to the power
- **an sd card** - and sd card adaptor to flash your image
- **a personal PC**
- **a wifi connection** - alternatively, an ethernet cable making the set up even easier
- **a storage device** - it has to be formatted in the proper way, more on this later  

## Software

- **a Raspbian image** - available [from the official Raspbian website](https://www.raspberrypi.org/downloads/raspberry-pi-os/)
- **a mounter** to flash your sd card - available [from the official Raspbian website](https://www.raspberrypi.org/downloads/)) 
- **a network scanner** - not required but it can be useful to detect your raspberry on the network. More on this later. [nmap](https://nmap.org/download.html) for the command line way / [AngryIP](https://angryip.org) for the visual way - among others 

# Steps

## 1. Access the PI on the network, set up your connection
This part is independent from the _NAS_ setup itself. You will have to make sure your raspberry can access the local network

### Core configuration

- **insert your sd card** to your laptop to burn it. Make sure you won't need the data in it, everything will be deleted!
- **open up the mounter software** and flash your card
- **don't remove your sd card yet!**
- **access your sd card boot directory** from your laptop. Eg: on Ubuntu, `cd /media/your_media_name/boot` - on MacOS `cd /Volumes/your_media_name/boot`
- **set up ssh by default** by creating an empty ssh file: `touch ssh` in the `boot` directory
- **make wifi available on boot**. To do this, you have to create a file: `wpa_supplicant.conf` in the `boot` directory and paste the following:
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
network={
    ssid="YOUR_NETWORK_NAME"
    psk="YOUR_PASSWORD"
    key_mgmt=WPA-PSK
}
```  
Of course, you will need to replace the ssid & password
- **time to check your setup**: you can now insert the card into your Pi and boot it 
- **at this point, locate your raspberry on the network**. There are several options. 
	- **Option 1** - you find it with the `ping` command. This command expect the name of your raspberry so it might be tricky depending on your model/version. Try the following:  
		- `ping raspberrypi.local`
		- `ping raspberrypi`
		- `ping raspi`   
	- **Option 2** - scan your network.
		- visually, with [AngryIP](https://angryip.org) 
		- via the command line with `nmap`. The following command `sudo nmap -sP 192.168.0.0/24` will scan your network and give hostnames if available. If your network is on `192.168.1.0/24` try it accordingly. 
- **once you found its ip**, you are ready to ssh the raspberry: `ssh pi@the_ip_adress_of_your_pi`. The default password is `raspberry`. You are now on your raspberry! 
- **update your password!** run `passwd` and update it!
- **to exit the ssh connection**, run `logout` 

### Optional config: connect automatically to your pi

You might find it a bit annoying to retype your ssh command and your password everytime you access your pi. We can configure the connection so that you won't be prompt to do it anymore. The condition is to have an ssh key set already. If not, [here is a good guide](http://rabexc.org/posts/using-ssh-agent) to drive you through!   
- Copy/Paste your laptop public key to the raspberry. Use the following command `ssh-copy-id pi@192.168.0.31` and replace the IP address accordingly. You will be prompt to enter your password. From now on, you should be able to log in without having to type your password!  

To go further: add it as an `alias` and you are all set!

### Optional config: control your pi remotely with a graphical interface

You will have to set up a VNC server on your raspberry first:
- `sudo apt install realvnc-vnc-server realvnc-vnc-viewer`
- Then enable VNC as follow: `sudo raspi-config` > `Interfacing Options` > `VNC : Yes`
- On your local laptop, you will be able to connect via a VNC viewer, for example [RealVNC](https://www.realvnc.com/)
- If you are facing the "Cannot Currently Show the Desktop", you will have to tweak some configuration on the resolution. 
	- `sudo raspi-config` > `Advanced Options` > Choose a wider resolution and reboot

 
## Set up your NAS

### Main Steps

- Update your raspberry system
```
sudo apt update
sudo apt upgrade
```
- Create private and public folders accessible from the NAS
```
sudo mkdir /home/shares
sudo mkdir /home/shares/public
sudo chown -R root:users /home/shares/public
sudo chmod -R ug=rwx,o=rx /home/shares/public
```
- Install a specific software to make your drive accessible to the network. One common software to do this is [Samba](https://www.samba.org/)  
```
sudo apt install samba samba-common-bin
```  

And hit `Yes` to be able to edit `smb.conf` file.
- Edit the `smb.conf` file with `sudo vi /etc/samba/smb.conf`. Here I use vi but feel free to use any text editor available from the command line. We will proceed to some modifications.  
	- Below the `##### Authentication #####` line, add: `security = user`.   
	This way, the first time someone wants to connect to the NAS, they will be prompt to enter a username/password couple defined later.  
	- In the `[homes]` section: `read only = no`
	- At the end of the file:  
```
[public] 
  comment = public storage 
  path = /home/shares/public/disk1 
  valid users = @users 
  force group = users 
  create mask = 0660 
  directory mask = 0771 
  read only = no
```
- Restart Samba
```
sudo /etc/init.d/smbd restart
```
- Add a user, `pi`. It will be prompted when some new device tries to connect to the server. Let's do:  
```
sudo smbpasswd -a pi
```
- **Proceed to adding your device**. There are **format requirements**: your device (either pen drive or external drive) as to be formatted in either `NTFS` or `ext4`. Make sure you checked first with your disk utility (on your laptop). If it's a different format, you will have to reformat it. [Here is a comparison of all formats](https://www.howtogeek.com/73178/what-file-system-should-i-use-for-my-usb-drive/). Beware that the `ext4` format is linux friendly but... that's pretty much it, meaning that your won't be able to read/write while inserting to a non-linux system. Beware that the `NTFS` is both Windows and Linux friendly. On a MacOS, it will be read-only. For the following parts, I will use a `NTFS` drive. 

- For each device, you will add them one by one and configure them one by one. We have to identify our device. 
```
dmesg 
``` 
We have to identify `sda1` which is most of the time our external device.  
- Create your descending folders and give reand and wite access to authenticated users. Here, these steps won't be effective if you insert  device not formatted as `ext4` or `NTFS`
```
sudo mkdir /home/shares/public/disk1
sudo chown -R root:users /home/shares/public/disk1
sudo chmod -R ug=rwx,o=rx /home/shares/public/disk1
```
- **Mount the drive to the server**  
	```
	sudo mount /dev/sda1 /home/shares/public/disk1
	```  

- Make the server available on boot to make it running every time your pi restart. You have to edit the `/etc/fstab` file  
	- `sudo vi /etc/fstab`
	- add the following at the bottom: `/dev/sda1 /home/shares/public/disk1 auto noatime,nofail 0 0`

- When unmounting the disk (if need be) do `umount` as follow:  
```
sudo umount /dev/sda1
```

...And you are all set! Again, if you want to remove the drive, use the `umount` command, and if you want to mount it **on the smb server**, use the `mount` command and point to the server location.  

Your server will be accessible from external devices on the same network at: `smb://192.168.0.31/public` - replace the IP with your raspberry IP accordingly.
- Connect from... will vary depending on the systems
	- MacOS:  Finder > Go > Connect to Server... > smb://192.168.0.31 > public

**What to check?**
- `sudo reboot` to check if the server remains alive after boot
- send a file to the server and check if the drive stored it. After sending, `sudo umount /dev/sda1`
- put the drive back to the pi and check if the server is still running. You will have to mount the server again with `sudo mount /dev/sda1 /home/shares/public/disk1` 


