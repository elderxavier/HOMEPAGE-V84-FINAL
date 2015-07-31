$(document).ready(function(){

	mascara();
	//changeOnScroll();
	ancora_menu();
	institucional();
	solicitante();
	//parceiro();
	//login();



	$("#menu-principal").menuMobile();
	//$('.fancybox').fancybox({
	//	'hideOnOverlayClick': false
	//});

});






//ancora menu
function ancora_menu(){
	$('#menu a, #escolha .box a').click(function(evt){
	     var alvo = $(this).attr('href').split('#').pop();
      $('html, body').animate({scrollTop: $('#'+alvo).offset().top - 148 }, 1700);
      //return false;
      evt.preventDefault();
   });
}







function login(){
	$("#menu .login").click(function(e){
		e.preventDefault();

		if($("#login").data("estado") == "fechado"){
	      $("#login").fadeIn(300);
	      $("#login").data("estado", "aberto");

	    }else{
	      $("#login").fadeOut(300);
	      $("#login").data("estado", "fechado");
	    }

  });
}







/*
function changeOnScroll(){
	
	$(window).scroll(function(){
		var topTopo       = $("#home").offset().top;
		var quemsomos  	  = $("#quemsomos").offset().top;
		var servicos      = $("#servicos").offset().top;
		var localizacao     = $("#localizacao").offset().top;
		var contato       = $("#contato").offset().top;
		var scrollAtual   = $(window).scrollTop() + 111;


		$("#menu li").removeClass("menu-li-ativo");	

		if(scrollAtual >= (quemsomos - 700) && scrollAtual < servicos){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(0)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (servicos - 850) && scrollAtual < localizacao){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(1)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (localizacao - 850) && scrollAtual < contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(2)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= (contato - 1050) && scrollAtual < contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(3)").addClass("menu-li-ativo");
		}

		if(scrollAtual >= contato){
			$("#menu li").removeClass("menu-li-ativo");
			$("#menu li:eq(4)").addClass("menu-li-ativo");
		}


	});
}

*/








/*modal
function modal(){
	$(".btn-solicitante").click(function(){
		$(".sobra-modal, #modal-solicitante").fadeIn(300);
	});



	$(".btn-parceiro").click(function(){
		$(".sobra-modal, #modal-parceiro").fadeIn(300);
	});

	$(".sobra-modal").click(function(){
		$(".sobra-modal, #modal-solicitante ,#modal-parceiro").fadeOut(300);
	});
}
*/




function solicitante(){

	/*$("#solicitante-btn").click(function(){
		$("#sol-1").fadeOut(300);
		$("#sol-2").fadeIn(900);
		$(".sombra").fadeIn(300);
		clearEmailSolicitacao();
		$("#menu li:eq(3)").click();
		initUploadImages();
	});

	$("#fechar-solicitante").click(function(){
		$("#sol-2").fadeOut(300);
		$("#sol-1").fadeIn(500);
		$(".sombra").fadeOut(300);
	}); */

	/*$("#open-foto-field").click(function(e){		
		$("#form_fotos01 #foto_field").click();
		e.preventDefault();
	});*/

	$("#open-foto-field2").click(function(e){
		$("#form_fotos02 #foto_field").click();
		e.preventDefault();
	});

	$("#sendSolicitacaoBtn").click(sendEmailSolicitacao);
}





/*

function parceiro(){

	$(".btn-parceiro").click(function(){
		$("#par-1").fadeOut(300);
		$("#cadastro-parceiros").fadeIn(900);
		$(".sombra").fadeIn(300);
	});

	$("#fechar-parceiro").click(function(){
		$("#cadastro-parceiros").fadeOut(300);
		$("#par-1").fadeIn(500);
		$(".sombra").fadeOut(300);
	});
}

*/





function institucional(){
	$("#institucional #content-0").show(300);

	$("#institucional ul li").click(function(){
		var index = $(this).index();

		$("#institucional .content").fadeOut(500);
		$("#institucional #content-"+index).fadeIn(500);

		$("#institucional ul li").removeClass("menu-institucional-ativo");
		$("#institucional ul li:eq("+index+")").addClass("menu-institucional-ativo");

	});
}








function mascara(){
	$(".mask-data").mask("99/99/9999"); //data
	$(".mask-fone").mask("(99) 9999-9999"); //telefone
}














//preview imagem
function preview(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}




//preview imagem
function preview_2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
  $('#preview_image2').attr('src', e.target.result)};
  	reader.readAsDataURL(input.files[0]);
  }
}


// anexos em emails
//var anexos01 = [];
var anexos02 = [];

$(function(){
	$("#form_fotos02 #foto_field").off('change').change(function(){
		$("#form_fotos02").submit();
		$("#preview02").append('<div class="preview-loader"></div>');
	});
});


function finishUploadImages02(result){
	if(result != 'error'){
		$("#preview02 .preview-loader").remove();
		$("#preview02").append('<img src="_temp/'+result+'">');
		anexos02.push(result);
	}
}

// envia o email
function sendEmailSolicitacao(){
	
	var holder = $("#solicitante-form-holder");

	$.ajax({
		type : 'POST',
		url  : 'data/EmailAnexo.send.php',
		data : {
			'nome'          : holder.find("#nome").val(),			
			'email'         : holder.find("#email").val(),			
			'telefone'      : holder.find("#telefone").val(),			
			'celular'       : holder.find("#celular").val(),			
			'estado'        : holder.find("#estado").val(),		
			'cidade'        : holder.find("#cidade").val(),		
			'bairro'        : holder.find("#bairro").val(),		
			'nacionalidade' : holder.find("#nacionalidade").val(),		
			'marca'         : holder.find("#marca").val(),		
			'modelo'        : holder.find("#modelo").val(),		
			'ano'           : holder.find("#ano").val(),		
			'tipo_peca'     : holder.find("#tipo_peca").val(),		
			'num_chassi'    : holder.find("#num_chassi").val(),		
			'num_peca'      : holder.find("#num_peca").val(),		
			'descricao'     : holder.find("#descricao").val(),
			'anexos02'      : anexos02
		},
		success : function(result){
			
			if(result != true){
				console.log(result);
				holder.find('#divResult').html(result);
			}
			else {		
				clearEmailSolicitacao();
				holder.find('#divResult').html('Sua solicitação foi enviada com sucesso.');
			}
		}

	});

}

function clearEmailSolicitacao(){
	
	var holder = $("#solicitante-form-holder");

	holder.find('input[type="text"], textarea').val('');			
	holder.find("select").prop('selectedIndex',0);
	anexos02 = [];
	$("#preview02").html('');
}



/**
 * Parceiros Email
 */

function sendEmailParceiro(){
	
	var holder = $("#parceiro-form-holder");
	
	$.ajax({
		type : 'POST',
		url  : 'data/EmailParceiro.send.php',
		data : {
			'empresa'       : holder.find("#empresa").val(),			
			'email'         : holder.find("#email").val(),			
			'site'          : holder.find("#site").val(),			
			'telefone'      : holder.find("#telefone").val(),			
			'celular'       : holder.find("#celular").val(),		
			'nextel'        : holder.find("#nextel").val(),		
			'redes_sociais' : holder.find("#redes_sociais").val(),		
			'estado'        : holder.find("#estado").val(),		
			'cidade'        : holder.find("#cidade").val(),		
			'bairro'        : holder.find("#bairro").val(),		
			'cep'           : holder.find("#cep").val(),		
			'endereco'      : holder.find("#endereco").val(),		
			'tipo_peca'     : holder.find("#tipo_peca").val()
		},
		success : function(result){
			
			if(result != true){
				console.log(result);
				holder.find('#divResult').html(result);
			}
			else {		
				clearEmailParceiro();
				holder.find('#divResult').html('Sua solicitação foi enviada com sucesso.');
			}
		}

	});
}

function clearEmailParceiro(){
	
	var holder = $("#parceiro-form-holder");

	holder.find('input[type="text"], textarea').val('');			
	holder.find("select").prop('selectedIndex',0);
}

$(function(){
	
	var holder = $("#parceiro-form-holder");

	holder.find('#sendBtn').click(sendEmailParceiro);
	holder.find('#clearBtn').click(clearEmailParceiro);

});



$(document).ready(function(){			
				$('#kanji-menu span').mouseover(function(event){
		    		event.preventDefault(event);
		    		//$('.top-logos').show(300);   				    		
        			$(".top-logos").animate({height: '40px'});
        			$("#menu").animate({margin: '40px 0 0 0'});    	
			});
			$('#kanji-menu span').click(function(event){		
		    		event.preventDefault();
		    		//$('.top-logos').hide(300);   		
		    		$(".top-logos").animate({height: '3px'});
        			$("#menu").animate({margin: '1px 0px 0px 0px'});
			

	  $('.facebook-2').mouseover(function(evt){
        $('.facebook-2 .social-toltip').css('display','block');            
        $('.facebook-2').css('opacity','1');
      });
      $('.facebook-2').mouseout(function(evt){
        $('.facebook-2 .social-toltip').css('display','none'); 
        //$('.facebook-2').css('opacity','0.3');   
        
      });

      $('.instagram').mouseover(function(evt){
        $('.instagram .social-toltip').css('display','block');
        //$('.instagram').css('opacity','1');       
      });
      $('.instagram').mouseout(function(evt){
        $('.instagram .social-toltip').css('display','none');    
        //$('.instagram').css('opacity','0.3');       
      });

      $('.youtube').mouseover(function(evt){
        $('.youtube .social-toltip').css('display','block'); 
        $('.youtube').css('opacity','1');          
      });
      $('.youtube').mouseout(function(evt){
        $('.youtube .social-toltip').css('display','none'); 
        //$('.youtube').css('opacity','0.3');   
      });

      $('.twitter').mouseover(function(evt){
        $('.twitter .social-toltip').css('display','block'); 
        //$('.twitter').css('opacity','1');   
      });
      $('.twitter').mouseout(function(evt){
        $('.twitter .social-toltip').css('display','none');    
        //$('.twitter').css('opacity','0.3');   
      });
		});	

	//$('#menu-classificados').click(function(evt){
		$('.v8class').click(function(evt){		
			$('html, body').animate({ scrollTop: $('.classificados-class table').offset().top - 148}, 1700);			
			evt.preventDefault();		
		});

});