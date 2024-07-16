document.addEventListener("DOMContentLoaded", function() {
    let $skillitems = document.getElementById("container-skills");
    let $iMario = document.getElementById("i-mario");
    let $skills = document.getElementsByClassName('skill-items');
    let $startButton = document.getElementById('startButton');
    let $container = document.getElementById('container');

    $startButton.addEventListener('click', animateSkills);

    let animationInProgress = false;
    let iconsToSkip = [];

    function checkSkillPosition() {
        const iMarioPosition = $iMario.getBoundingClientRect();

        for (let x = 0; x < $skills.length; x++) {
            let skillPosition = $skills[x].getBoundingClientRect();
            if (Math.abs((skillPosition.left - 120) - iMarioPosition.left) < 10) {
                $iMario.classList.add('jump');
                setTimeout(() => {
                    $iMario.classList.remove('jump');
                }, 700);
                iconsToSkip.push(x); // Adiciona ícone à lista de ícones pulados
            }
        }
    }

    function monitorScroll() {
        const iMarioPosition = $iMario.getBoundingClientRect();
        const $containerPosition = $skillitems.getBoundingClientRect();

        if (iMarioPosition.left >= $containerPosition.left &&
            iMarioPosition.right <= $containerPosition.right) {
            checkSkillPosition();
        }
    }

    $skillitems.addEventListener('scroll', monitorScroll);

    function animateSkills() {
        if (animationInProgress) {
            return; // Retorna se a animação já estiver em progresso
        }

        animationInProgress = true;
        $startButton.style.display = 'none';
        $container.classList.add('animate-container');

        const maxScroll = $skillitems.scrollWidth - $skillitems.clientWidth;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const animationDuration = 10000; // Duração da animação em milissegundos (10 segundos)
            const newScrollLeft = (progress / animationDuration) * maxScroll; // Ajuste para uma animação mais lenta

            $skillitems.scrollLeft = newScrollLeft;

            if (newScrollLeft < maxScroll) {
                requestAnimationFrame(step);
            } else {
                animationInProgress = false;
                $startButton.style.display = 'flex'; 
                $container.classList.remove('animate-container');
                iconsToSkip = []; // Limpa o array de ícones pulados ao final da animação
                $skillitems.scrollLeft = 0; // Reseta o scroll para o início
                checkSkillPosition(); // Chama checkSkillPosition uma última vez para garantir que o último ícone seja pulado
            }
        }

        requestAnimationFrame(step);
    }
});
