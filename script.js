// ===== SISTEMA DE CAROUSEL E SELEÇÃO DE EMBALAGENS =====

document.addEventListener('DOMContentLoaded', function () {
    const carousels = document.querySelectorAll('.produtos-carousel');

    carousels.forEach(carousel => {
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const totalSlides = slides.length;

        if (totalSlides === 0) return;

        // Função para mostrar um slide específico
        function showSlide(n) {
            slides.forEach(slide => slide.classList.remove('ativo'));
            dots.forEach(dot => dot.classList.remove('ativo'));

            if (slides[n]) slides[n].classList.add('ativo');
            if (dots[n]) dots[n].classList.add('ativo');
        }

        // Event listeners para os dots de navegação
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Event listeners para as setas de navegação
        const prevArrow = carousel.querySelector('.carousel-arrow.prev');
        const nextArrow = carousel.querySelector('.carousel-arrow.next');

        if (prevArrow) {
            prevArrow.addEventListener('click', function () {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            });
        }

        if (nextArrow) {
            nextArrow.addEventListener('click', function () {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            });
        }

        // ===== SUPORTE A TOUCH (SWIPE) PARA DISPOSITIVOS MÓVEIS =====
        let touchstartX = 0;
        let touchstartY = 0;
        let touchendX = 0;
        let touchendY = 0;

        carousel.addEventListener('touchstart', function (event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        }, { passive: true });

        carousel.addEventListener('touchend', function (event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesture();
        }, { passive: true });

        function handleGesture() {
            const diffX = touchendX - touchstartX;
            const diffY = touchendY - touchstartY;

            // Checa se o movimento foi majoritariamente horizontal (evita conflito com scroll)
            if (Math.abs(diffX) > Math.abs(diffY)) {
                // Distância mínima para validar o swipe (50px)
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        // Swipe para a direita -> slide anterior
                        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                    } else {
                        // Swipe para a esquerda -> próximo slide
                        currentSlide = (currentSlide + 1) % totalSlides;
                    }
                    showSlide(currentSlide);
                }
            }
        }

        // Mostra o primeiro slide ao carregar
        showSlide(currentSlide);
    });

    // ===== SISTEMA DE SELEÇÃO DE EMBALAGENS =====
    const embalagensButtons = document.querySelectorAll('.embalagem-btn-carousel');

    embalagensButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Encontra o slide pai do botão clicado
            const slide = this.closest('.carousel-slide');

            // Remove a classe 'ativo' de todos os botões deste slide
            const botoesDoSlide = slide.querySelectorAll('.embalagem-btn-carousel');
            botoesDoSlide.forEach(btn => btn.classList.remove('ativo'));

            // Adiciona a classe 'ativo' apenas ao botão clicado
            this.classList.add('ativo');

            // Obtém os dados do botão
            const novaImagem = this.getAttribute('data-image');
            const novoPreco = this.getAttribute('data-price');

            // Atualiza a imagem do produto
            const imagemProduto = slide.querySelector('.produto-carousel-img');
            imagemProduto.src = novaImagem;

            // Atualiza o preço
            const precoProduto = slide.querySelector('.preco-valor');
            precoProduto.textContent = novoPreco;

            // Adiciona uma animação suave
            imagemProduto.style.opacity = '0.7';
            setTimeout(() => {
                imagemProduto.style.opacity = '1';
                imagemProduto.style.transition = 'opacity 0.3s ease';
            }, 50);
        });
    });
});
