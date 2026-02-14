// ===== SISTEMA DE CAROUSEL E SELEÇÃO DE EMBALAGENS =====

document.addEventListener('DOMContentLoaded', function () {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    // Função para mostrar um slide específico
    function showSlide(n) {
        // Remove a classe 'ativo' de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('ativo'));
        dots.forEach(dot => dot.classList.remove('ativo'));

        // Adiciona a classe 'ativo' ao slide e dot atual
        slides[n].classList.add('ativo');
        dots[n].classList.add('ativo');
    }

    // Event listeners para os dots de navegação
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Event listeners para as setas de navegação
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');

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

    // Navegação por teclado (setas)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        } else if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }
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

    // Mostra o primeiro slide ao carregar
    showSlide(currentSlide);
});
