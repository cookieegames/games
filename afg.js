let imageUrl = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f9d95985-fc75-461e-8646-63f8a3a3557d/d1c43a0-149f5b37-be50-49b8-b10b-aa63b5d674a2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y5ZDk1OTg1LWZjNzUtNDYxZS04NjQ2LTYzZjhhM2EzNTU3ZFwvZDFjNDNhMC0xNDlmNWIzNy1iZTUwLTQ5YjgtYjEwYi1hYTYzYjVkNjc0YTIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kASp_Su4xu1eMHDM5FyJDGT0IZYK4eQoD6dpcpxTyRw";
let imageBlob = UrlFetchApp.fetch(imageUrl).getBlob();
let mediaOperation = AdsApp.adMedia().newImageBuilder()
    .withName("IMAGE_NAME")
    .withData(imageBlob)
    .build();
