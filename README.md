# Teaching-HEIGVD-RES-2018-Labo-HTTPInfra

Julien Rod, Yoann Simonet

## Objectives

The first objective of this lab is to get familiar with software tools that will allow us to build a **complete web infrastructure**. By that, we mean that we will build an environment that will allow us to serve **static and dynamic content** to web browsers. To do that, we will see that the **apache httpd server** can act both as a **HTTP server** and as a **reverse proxy**. We will also see that **express.js** is a JavaScript framework that makes it very easy to write dynamic web apps.

The second objective is to implement a simple, yet complete, **dynamic web application**. We will create **HTML**, **CSS** and **JavaScript** assets that will be served to the browsers and presented to the users. The JavaScript code executed in the browser will issue asynchronous HTTP requests to our web infrastructure (**AJAX requests**) and fetch content generated dynamically.

The third objective is to practice our usage of **Docker**. All the components of the web infrastructure will be packaged in custom Docker images (we will create at least 3 different images).

## General instructions

* This is a **BIG** lab and you will need a lot of time to complete it. This is the last lab of the semester (but it will keep us busy for a few weeks!).
* We have prepared webcasts for a big portion of the lab (**what can get you the "base" grade of 4.5**).
* To get **additional points**, you will need to do research in the documentation by yourself (we are here to help, but we will not give you step-by-step instructions!). To get the extra points, you will also need to be creative (do not expect complete guidelines).
* The lab can be done in **groups of 2 students**. You will learn very important skills and tools, which you will need to next year's courses. You cannot afford to skip this content if you want to survive next year.
* Read carefully all the **acceptance criteria**.
* We will request demos as needed. When you do your **demo**, be prepared to that you can go through the procedure quickly (there are a lot of solutions to evaluate!)
* **You have to write a report. Please do that directly in the repo, in one or more markdown files. Start in the README.md file at the root of your directory.**
* The report must contain the procedure that you have followed to prove that your configuration is correct (what you would do if you were doing a demo)


## Step 1: Static HTTP server with apache httpd

### Webcasts

* [Labo HTTP (1): Serveur apache httpd "dockerisé" servant du contenu statique](https://www.youtube.com/watch?v=XFO4OmcfI3U)

### Acceptance criteria

* You have a GitHub repo with everything needed to build the Docker image.
* You can do a demo, where you build the image, run a container and access content from a browser.
* You have used a nice looking web template, different from the one shown in the webcast.
* You are able to explain what you do in the Dockerfile.
* You are able to show where the apache config files are located (in a running container).
* You have **documented** your configuration in your report.

### Travail réalisé

Nous avons suivi le webcast et implémenté un serveur apache.
 
Le bootstrap utilisé est similaire à celui que le prof montre dans sa vidéo, mais mis à jour depuis.

Pour cette partie nous n'avons eu qu'à créer le DockerFile et télécharger le [bootstrap](https://startbootstrap.com/themes/freelancer/) .

Pour valider cette étape, nous avons simplement lancé notre image docker (une fois construite), 
puis, nous y avons accédé via telnet. Nous recevons bel et bien le code PHP de la page correspondante.


## Step 2: Dynamic HTTP server with express.js

### Webcasts

* [Labo HTTP (2a): Application node "dockerisée"](https://www.youtube.com/watch?v=fSIrZ0Mmpis)
* [Labo HTTP (2b): Application express "dockerisée"](https://www.youtube.com/watch?v=o4qHbf_vMu0)

### Acceptance criteria

* You have a GitHub repo with everything needed to build the Docker image.
* You can do a demo, where you build the image, run a container and access content from a browser.
* You generate dynamic, random content and return a JSON payload to the client.
* You cannot return the same content as the webcast (you cannot return a list of people).
* You don't have to use express.js; if you want, you can use another JavaScript web framework or event another language.
* You have **documented** your configuration in your report.

### Travail réalisé
Nous avons suivi le webcast et implémenté le serveur dynamic qui génére aléatoirement des animaux.
```var Chance = require('chance');
var chance = new Chance();

var Express = require('express');
var app = Express();

app.get('/', function(req, res) {
    res.send(generateAnimals());
});

app.listen(3000, function() {
    console.log('Accepting HTTP requests on port 3000!');
});
 
function generateAnimals(){
	var numberOfAnimals = chance.integer({
		min : 1,
		max : 10
	});
	
	console.log(numberOfAnimals);
	
	var Animals = [];
	
	for(var i = 0; i < numberOfAnimals; ++i){
        var gender = chance.gender();
		Animals.push({
            
            'animal'   : chance.animal(),
            'name'    :  chance.first({gender: gender}),
            'gender'  : gender,
			'birthday': chance.birthday({year : chance.year({min : 2008,max : 2019})})
		});
	}
	console.log(Animals);
	return Animals;
}
```

## Step 3: Reverse proxy with apache (static configuration)

### Webcasts

* [Labo HTTP (3a): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=WHFlWdcvZtk)
* [Labo HTTP (3b): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=fkPwHyQUiVs)
* [Labo HTTP (3c): reverse proxy apache httpd dans Docker](https://www.youtube.com/watch?v=UmiYS_ObJxY)


### Acceptance criteria

* You have a GitHub repo with everything needed to build the Docker image for the container.
* You can do a demo, where you start from an "empty" Docker environment (no container running) and where you start 3 containers: static server, dynamic server and reverse proxy; in the demo, you prove that the routing is done correctly by the reverse proxy.
* You can explain and prove that the static and dynamic servers cannot be reached directly (reverse proxy is a single entry point in the infra). 
* You are able to explain why the static configuration is fragile and needs to be improved.
* You have **documented** your configuration in your report.

### Travail réalisé
Nous avons suivi le webcast et implémenté un reverse proxy.

Pour ceci nous avons dû créer le Dockerfile et les différents fichiers de configuration se trouvant dans le dossier
sites-available.

Nos deux sites (dynamique et statique) étant lancé grâce à Docker, ils ne peuvent pas être atteints
depuis l'extérieur de l'application (sauf si on lance leurs images avec -p). Le reverse proxy sert d'intermédiaire entre l'utilisateur
et ces sites-là grâce au port mapping 8080:80. 

La configuration statique est fragile car rien ne nous indique que les adresses IP de nos différents sites
resteront les mêmes.


## Step 4: AJAX requests with JQuery

### Webcasts

* [Labo HTTP (4): AJAX avec JQuery](https://www.youtube.com/watch?v=fgpNEbgdm5k)

### Acceptance criteria

* You have a GitHub repo with everything needed to build the various images.
* You can do a complete, end-to-end demonstration: the web page is dynamically updated every few seconds (with the data coming from the dynamic backend).
* You are able to prove that AJAX requests are sent by the browser and you can show the content of th responses.
* You are able to explain why your demo would not work without a reverse proxy (because of a security restriction).
* You have **documented** your configuration in your report.

### Travail réalisé
Nous avons suivi le webcast et pour installer VIM et pour réaliser le programme chargé de modifier le texte toutes les 2
secondes.

Lors de l'installation de VIM sur notre serveur dynamique, nous nous sommes heurté à une erreur lors du build de notre image.
Nous avons réussi à la contourner en utilisant le code du Dockerfile ci-dessous:
```bash
FROM node:4.4

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list
RUN apt-get update && apt-get install -y vim

COPY src /opt/app


RUN npm install --save chance
RUN npm install --save express

CMD ["node", "/opt/app/index.js"]
```

Nous avons aussi implémenter le code javascript demandé dans la partie statique de l'application.
```$(function(){
  console.log("Loading animals");

  function loadAnimals(){
    $.getJSON( "/api/animals/", function( animals ){
      console.log(animals);
      var message = "Nobody is here";
      if( animals.length > 0){
        message = animals[0].animal + " " + animals[0].name;
      }
      $(".test").text(message);
    });
  };

  loadAnimals();
  setInterval( loadAnimals, 2000 );
});
```

Nous avons aussi rajouté le lien javascript suivant au bas de la page de notre serveur statique (index.html) et aussi la classe test dans le texet qui devait changer :
```html
  <h2 class="test">J' aime le C++</h2>
  .
  .
  .
  <!-- Custom script to load animals -->
  <script src="js/animals.js"></script>
```
On constate maintenant que le nom change toutes les 2 secondes si on lance nos serveurs et qu'on y accède via un brawser.

Notre démo ne marcherait pas sans reverse proxy, car nous ne pouvons pas nous connecter directement aux serveurs statique ou dynamique.

## Step 5: Dynamic reverse proxy configuration

### Webcasts

* [Labo HTTP (5a): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=iGl3Y27AewU)
* [Labo HTTP (5b): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=lVWLdB3y-4I)
* [Labo HTTP (5c): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=MQj-FzD-0mE)
* [Labo HTTP (5d): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=B_JpYtxoO_E)
* [Labo HTTP (5e): configuration dynamique du reverse proxy](https://www.youtube.com/watch?v=dz6GLoGou9k)

### Acceptance criteria

* You have a GitHub repo with everything needed to build the various images.
* You have found a way to replace the static configuration of the reverse proxy (hard-coded IP adresses) with a dynamic configuration.
* You may use the approach presented in the webcast (environment variables and PHP script executed when the reverse proxy container is started), or you may use another approach. The requirement is that you should not have to rebuild the reverse proxy Docker image when the IP addresses of the servers change.
* You are able to do an end-to-end demo with a well-prepared scenario. Make sure that you can demonstrate that everything works fine when the IP addresses change!
* You are able to explain how you have implemented the solution and walk us through the configuration and the code.
* You have **documented** your configuration in your report.

### Travail réalisé
Nous avons suivi le webcast pour pouvoir passer les adresses de nos différents sites à notre reverse proxy.

Pour ce faire, nous avons dû créer un fichier apache2-foreground pour remplacer celui de base.
```bash
#!/bin/bash
set -e

# Note: we don't just use "apache2ctl" here because it itself is just a shell-script wrapper around apache2 which provides extra functionality like "apache2ctl start" for launching apache2 in the background.
# (also, when run as "apache2ctl <apache args>", it does not use "exec", which leaves an undesirable resident shell process)

: "${APACHE_CONFDIR:=/etc/apache2}"
: "${APACHE_ENVVARS:=$APACHE_CONFDIR/envvars}"
if test -f "$APACHE_ENVVARS"; then
	. "$APACHE_ENVVARS"
fi

# Add setup for RES lab
echo "Setup for the RES lab..."
echo "Static App URL: $STATIC_APP"
echo "Dynamic App URL: $DYNAMIC_APP"
php /var/apache2/templates/config-template.php > /etc/apache2/sites-available/001-reverse-proxy.conf

# Apache gets grumpy about PID files pre-existing
rm -f /var/run/apache2/apache2.pid


# create missing directories
# (especially APACHE_RUN_DIR, APACHE_LOCK_DIR, and APACHE_LOG_DIR)
for e in "${!APACHE_@}"; do
	if [[ "$e" == *_DIR ]] && [[ "${!e}" == /* ]]; then
		# handle "/var/lock" being a symlink to "/run/lock", but "/run/lock" not existing beforehand, so "/var/lock/something" fails to mkdir
		#   mkdir: cannot create directory '/var/lock': File exists
		dir="${!e}"
		while [ "$dir" != "$(dirname "$dir")" ]; do
			dir="$(dirname "$dir")"
			if [ -d "$dir" ]; then
				break
			fi
			absDir="$(readlink -f "$dir" 2>/dev/null || :)"
			if [ -n "$absDir" ]; then
				mkdir -p "$absDir"
			fi
		done

		mkdir -p "${!e}"
	fi
done

exec apache2 -DFOREGROUND
```
Créer un fichier config-template.php pour enregistrer les adresses de nos deux serveurs sur la base
du fichier 001-reverse-proxy.conf.
```php
<?php
	$static_app = getenv('STATIC_APP');
	$dynamic_app = getenv('DYNAMIC_APP');
?>
<VirtualHost *:80>
	ServerName demo.res.ch

	ProxyPass '/api/animals/' 'http://<?php print "$dynamic_app"?>/'
	ProxyPassReverse '/api/animals/' 'http://<?php print "$dynamic_app"?>/'

	ProxyPass '/' 'http://<?php print "$static_app"?>/'
    ProxyPassReverse '/' 'http://<?php print "$static_app"?>/'
</VirtualHost>
```
Puis, nous avons modifié notre Dockerfile comme ceci :
```Dockerfile
FROM php:5.6-apache

RUN apt-get update && apt-get install -y vim

COPY apache2-foreground /usr/local/bin/
COPY templates /var/apache2/templates

COPY conf/ /etc/apache2

RUN a2enmod proxy proxy_http
RUN a2ensite 000-* 001-*
```
pour que nous puissions lui passer les adresses des serveurs via l'option -e de Docker.

Après avoir testé notre programme, nous avons validé le fait que nous pouvions bel et bien passer
les adresses à notre reverse proxy au démarrage de ce dernier.

## Additional steps to get extra points on top of the "base" grade

### Load balancing: multiple server nodes (0.5pt)

* You extend the reverse proxy configuration to support **load balancing**. 
* You show that you can have **multiple static server nodes** and **multiple dynamic server nodes**. 
* You prove that the **load balancer** can distribute HTTP requests between these nodes.
* You have **documented** your configuration and your validation procedure in your report.

### Load balancing: round-robin vs sticky sessions (0.5 pt)

* You do a setup to demonstrate the notion of sticky session.
* You prove that your load balancer can distribute HTTP requests in a round-robin fashion to the dynamic server nodes (because there is no state).
* You prove that your load balancer can handle sticky sessions when forwarding HTTP requests to the static server nodes.
* You have documented your configuration and your validation procedure in your report.

### Dynamic cluster management (0.5 pt)

* You develop a solution, where the server nodes (static and dynamic) can appear or disappear at any time.
* You show that the load balancer is dynamically updated to reflect the state of the cluster.
* You describe your approach (are you implementing a discovery protocol based on UDP multicast? are you using a tool such as serf?)
* You have documented your configuration and your validation procedure in your report.

### Management UI (0.5 pt)

* You develop a web app (e.g. with express.js) that administrators can use to monitor and update your web infrastructure.
* You find a way to control your Docker environment (list containers, start/stop containers, etc.) from the web app. For instance, you use the Dockerode npm module (or another Docker client library, in any of the supported languages).
* You have documented your configuration and your validation procedure in your report.

### Conclusion
Dans l'ensemble, à part quelques petits problèmes rencontrés (problème sité plus haut, oubli de $
dans les variables php, etc...) ce laboratoire c'est bien déroulé.

Nous avons simplement suivi les podcasts web pour le réaliser.

Dommage que nous n'ayons pas plus de temps pour faire les points bonus (fin de semestre chargé).
